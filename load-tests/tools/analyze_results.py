#!/usr/bin/env python3
# Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
#
# WSO2 LLC. licenses this file to you under the Apache License,
# Version 2.0 (the "License"); you may not use this file except
# in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied. See the License for the
# specific language governing permissions and limitations
# under the License.
"""Summarizes one load test run directory.

Produces, next to the raw files of the run:
  summary-line.csv     the run in the format of results/summary.csv
  jfr-metrics.json     key JVM figures from the JFR recording
  charts/*.png         heap, GC, CPU, threads, allocation and pinning over time
  jmc-automated-analysis.html  the JDK Mission Control rules report (when JMC is installed)

Usage: analyze_results.py <run-dir> [--users N] [--payload N] [--jmc-plugins DIR]
"""
import argparse
import csv
import json
import math
import pathlib
import statistics
import subprocess
import sys
from datetime import datetime

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

JFR_EVENTS = ["jdk.GCHeapSummary", "jdk.GarbageCollection", "jdk.CPULoad", "jdk.JavaThreadStatistics",
              "jdk.VirtualThreadPinned", "jdk.ObjectAllocationSample", "jdk.ContainerConfiguration",
              "jdk.GCConfiguration", "jdk.CPUInformation"]


def summarize_jtl(jtl, users, payload):
    elapsed, failures, received, first, last = [], 0, 0, None, None
    with open(jtl, newline="") as f:
        for row in csv.DictReader(f):
            ms = int(row["elapsed"])
            ts = int(row["timeStamp"])
            elapsed.append(ms)
            received += int(row["bytes"])
            failures += row["success"] != "true"
            first = ts if first is None else min(first, ts)
            last = ts + ms if last is None else max(last, ts + ms)
    elapsed.sort()
    n = len(elapsed)
    seconds = (last - first) / 1000

    def pct(p):
        return elapsed[min(n - 1, math.ceil(n * p / 100) - 1)]

    return {
        "Label": "HTTP Request", "# Samples": n, "Average": round(sum(elapsed) / n), "Median": pct(50),
        "90% Line": pct(90), "95% Line": pct(95), "99% Line": pct(99), "Min": elapsed[0], "Max": elapsed[-1],
        "Error %": f"{failures * 100 / n:.2f}%", "Throughput": round(n / seconds, 1),
        "Received KB/sec": round(received / 1024 / seconds, 1), "Std. Dev.": round(statistics.pstdev(elapsed), 2),
        "Date": int(first / 1000), "Payload": payload, "Users": users,
    }


def read_jfr(jfr):
    def events(names, depth):
        out = subprocess.run(["jfr", "print", "--json", "--stack-depth", str(depth), "--events", ",".join(names),
                              str(jfr)], capture_output=True, text=True, check=True).stdout
        return json.loads(out)["recording"]["events"]

    # Only the pinning events need deep stacks, to find the driver frame that holds the monitor.
    pinned = "jdk.VirtualThreadPinned"
    return events([e for e in JFR_EVENTS if e != pinned], 1) + events([pinned], 64)


def ts(event):
    return datetime.fromisoformat(event["values"]["startTime"].replace("Z", "+00:00")).timestamp()


def duration_ms(value):
    # JFR JSON durations look like "PT0.012345S"
    if isinstance(value, (int, float)):
        return value / 1e6
    return float(value.removeprefix("PT").removesuffix("S")) * 1000


def charts(events, out_dir, title):
    out_dir.mkdir(exist_ok=True)
    by = {}
    for e in events:
        by.setdefault(e["type"], []).append(e)
    t0 = min(ts(e) for e in events)
    metrics = {}

    def save(fig, name):
        fig.tight_layout()
        fig.savefig(out_dir / name, dpi=130)
        plt.close(fig)

    heap = [e for e in by.get("jdk.GCHeapSummary", []) if e["values"]["when"] == "After GC"]
    if heap:
        fig, ax = plt.subplots(figsize=(9, 3.2))
        ax.plot([ts(e) - t0 for e in heap], [e["values"]["heapUsed"] / 2**20 for e in heap], lw=1, color="#1f5f8b",
                label="heap used after GC")
        ax.plot([ts(e) - t0 for e in heap], [e["values"]["heapSpace"]["committedSize"] / 2**20 for e in heap], lw=1,
                color="#9aa6b6", label="heap committed")
        ax.set(title=f"{title}: heap", xlabel="seconds", ylabel="MiB")
        ax.legend(loc="upper left", fontsize=8)
        save(fig, "heap.png")
        used = [e["values"]["heapUsed"] / 2**20 for e in heap]
        metrics["heapAfterGcMiB"] = {"min": round(min(used), 1), "median": round(statistics.median(used), 1),
                                     "max": round(max(used), 1),
                                     "lastMinuteAvg": round(statistics.mean(used[-max(1, len(used) // 10):]), 1)}

    gcs = by.get("jdk.GarbageCollection", [])
    if gcs:
        pauses = [duration_ms(e["values"]["sumOfPauses"]) for e in gcs]
        fig, ax = plt.subplots(figsize=(9, 3.2))
        ax.scatter([ts(e) - t0 for e in gcs], pauses, s=4, color="#b3261e")
        ax.set(title=f"{title}: GC pauses ({len(gcs)} collections)", xlabel="seconds", ylabel="pause ms")
        save(fig, "gc-pauses.png")
        span = ts(gcs[-1]) - ts(gcs[0]) or 1
        metrics["gc"] = {"collections": len(gcs), "names": sorted({e["values"]["name"] for e in gcs}),
                         "pauseMsP50": round(statistics.median(pauses), 2),
                         "pauseMsMax": round(max(pauses), 2), "totalPauseMs": round(sum(pauses), 1),
                         "pauseTimePercent": round(sum(pauses) / 1000 / span * 100, 2)}

    cpu = by.get("jdk.CPULoad", [])
    if cpu:
        fig, ax = plt.subplots(figsize=(9, 3.2))
        x = [ts(e) - t0 for e in cpu]
        ax.plot(x, [100 * (e["values"]["jvmUser"] + e["values"]["jvmSystem"]) for e in cpu], lw=1, color="#1f5f8b",
                label="JVM")
        ax.plot(x, [100 * e["values"]["machineTotal"] for e in cpu], lw=1, color="#9aa6b6", label="machine")
        ax.set(title=f"{title}: CPU", xlabel="seconds", ylabel="% of available CPU", ylim=(0, 105))
        ax.legend(loc="upper left", fontsize=8)
        save(fig, "cpu.png")
        jvm = [100 * (e["values"]["jvmUser"] + e["values"]["jvmSystem"]) for e in cpu]
        metrics["cpuJvmPercent"] = {"median": round(statistics.median(jvm), 1), "max": round(max(jvm), 1)}

    threads = by.get("jdk.JavaThreadStatistics", [])
    if threads:
        fig, ax = plt.subplots(figsize=(9, 3.2))
        ax.plot([ts(e) - t0 for e in threads], [e["values"]["activeCount"] for e in threads], lw=1, color="#4c8a5f")
        ax.set(title=f"{title}: live platform threads", xlabel="seconds", ylabel="threads")
        save(fig, "threads.png")
        metrics["platformThreadsMax"] = max(e["values"]["activeCount"] for e in threads)

    alloc = by.get("jdk.ObjectAllocationSample", [])
    if alloc:
        buckets = {}
        for e in alloc:
            buckets.setdefault(int(ts(e) - t0), 0)
            buckets[int(ts(e) - t0)] += e["values"]["weight"]
        xs = sorted(buckets)
        fig, ax = plt.subplots(figsize=(9, 3.2))
        ax.plot(xs, [buckets[x] / 2**20 for x in xs], lw=1, color="#9a5b00")
        ax.set(title=f"{title}: allocation rate (sampled)", xlabel="seconds", ylabel="MiB/s")
        save(fig, "allocation.png")
        metrics["allocationMiBPerSecMedian"] = round(statistics.median(buckets[x] / 2**20 for x in xs), 1)

    pinned = by.get("jdk.VirtualThreadPinned", [])
    metrics["virtualThreadPinnedEvents"] = len(pinned)
    if pinned:
        durations = [duration_ms(e["values"]["duration"]) for e in pinned]
        fig, ax = plt.subplots(figsize=(9, 3.2))
        ax.scatter([ts(e) - t0 for e in pinned], durations, s=4, color="#7a3fa0")
        ax.set(title=f"{title}: virtual thread pinned events over 20 ms ({len(pinned)})", xlabel="seconds",
               ylabel="pinned ms")
        save(fig, "virtual-thread-pinned.png")
        frames = {}
        for e in pinned:
            for frame in (e["values"].get("stackTrace") or {}).get("frames", []):
                method = frame["method"]
                name = f'{method["type"]["name"].replace("/", ".")}.{method["name"]}'
                if name.startswith("com.ibm.db2"):
                    frames[name] = frames.get(name, 0) + 1
                    break
        metrics["virtualThreadPinned"] = {"durationMsP50": round(statistics.median(durations), 1),
                                          "durationMsMax": round(max(durations), 1),
                                          "topJccFrames": sorted(frames.items(), key=lambda kv: -kv[1])[:5]}

    for key, event in (("container", "jdk.ContainerConfiguration"), ("gcConfiguration", "jdk.GCConfiguration")):
        if by.get(event):
            metrics[key] = {k: v for k, v in by[event][0]["values"].items() if k not in ("startTime",)}
    return metrics


def jmc_report(jfr, out, plugins):
    jars = []
    for prefix in ("org.openjdk.jmc.common_", "org.openjdk.jmc.flightrecorder_", "org.openjdk.jmc.flightrecorder.rules_",
                   "org.openjdk.jmc.flightrecorder.rules.jdk_", "lz4-java_", "org.owasp.encoder_"):
        jars += sorted(str(p) for p in pathlib.Path(plugins).glob(prefix + "*.jar"))
    if len(jars) < 6:
        return False
    html = subprocess.run(["java", "-cp", ":".join(jars), "org.openjdk.jmc.flightrecorder.rules.report.html.JfrHtmlRulesReport",
                           str(jfr)], capture_output=True, text=True)
    if html.returncode != 0 or "<html" not in html.stdout.lower():
        print(html.stderr[-2000:], file=sys.stderr)
        return False
    out.write_text(html.stdout)
    return True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("run")
    parser.add_argument("--users", type=int, default=60)
    parser.add_argument("--payload", type=int, default=50)
    parser.add_argument("--jmc-plugins", default="/Applications/JDK Mission Control.app/Contents/Eclipse/plugins")
    args = parser.parse_args()
    run = pathlib.Path(args.run)
    summary = summarize_jtl(run / "results.jtl", args.users, args.payload)
    with open(run / "summary-line.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(summary))
        writer.writeheader()
        writer.writerow(summary)
    jfr = next(run.glob("*.jfr"))
    metrics = charts(read_jfr(jfr), run / "charts", run.name)
    metrics["jmcReport"] = jmc_report(jfr, run / "jmc-automated-analysis.html", args.jmc_plugins)
    (run / "jfr-metrics.json").write_text(json.dumps({"summary": summary, "jvm": metrics}, indent=2))
    print(json.dumps({"run": run.name, "summary": summary, "jvm": metrics}, indent=2))


if __name__ == "__main__":
    main()
