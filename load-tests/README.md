# Load tests

These tests follow the load tests of the other Ballerina SQL connectors: a Ballerina HTTP service that uses `ballerinax/ibm.db2` runs with the resource limits in `src/Cloud.toml` (1 CPU, 512 MiB), and JMeter drives it with the plan in `scripts/` (60 users, 60 s ramp-up). Each run also records the service JVM with JDK Flight Recorder.

| Operation | Service | Request |
|---|---|---|
| [query_operation](query_operation) | `GET /customer?id=<1-8>` runs `queryRow` by primary key | `scripts/http-get-request.jmx` |
| [execute_operation](execute_operation) | `POST /customer?id=<1-14>&newCreditLimit=<n>` runs an `UPDATE` | `scripts/http-post-request.jmx` |

## Results (29 Oct 2026)

Db2 12.1.2 Community Edition, IBM JCC 12.1.5, Ballerina 2201.13.6 on Temurin 21.0.12, JMeter 5.5. Service, Db2 and JMeter on one Intel i5-6500T host (4 cores), so requests use loopback.

| Run | Duration | Requests | Throughput (req/s) | Average (ms) | p95 (ms) | p99 (ms) | Errors |
|---|---|---|---|---|---|---|---|
| A query, default settings | 600 s | 518,579 | **864.4** | 66 | 103 | 201 | 0% |
| C query, 16 carrier threads | 300 s | 245,460 | 819.2 | 66 | 158 | 199 | 0% |
| B execute, default settings | 600 s | 244,685 | **407.8** | 140 | 160 | 207 | 0% |
| D execute, 16 carrier threads | 300 s | 209,777 | **699.4** | 77 | 181 | 217 | 0% |

The default runs are also recorded in `results/summary.csv` in the same format as the other connectors. `results/tuning-summary.csv` holds both runs of each operation. The 300 s runs include the same 60 s ramp-up as the 600 s runs, which lowers their average throughput slightly.

### What the JVM recordings show

| Run | JVM CPU (of the 1-CPU limit) | Heap after GC (median) | GC pause time | Virtual thread pinned events over 20 ms |
|---|---|---|---|---|
| A query | 100% | 23.8 MiB | 2.9% | 7,767 |
| C query, 16 carriers | 100% | 21.8 MiB | 3.1% | 26,926 |
| B execute | 58% | 22.3 MiB | 1.3% | 1,350 |
| D execute, 16 carriers | 100% | 21.6 MiB | 2.7% | 38,141 |

- **No leaks.** The heap stays between about 10 and 32 MiB for the whole of every run, and the JMC Memory page shows a flat sawtooth. The largest allocators are the HTTP transport (Netty buffers, headers), not the connector.
- **The query service is CPU bound.** At 1 CPU it uses the full core in both A and C, so more carrier threads cannot add throughput.
- **The execute service is held back by thread pinning.** In B the service uses only 58% of its CPU while requests wait. Every pinned event in every run has the IBM JCC frame `com.ibm.db2.jcc.t4.x.b` (the driver's socket read) on its stack: the driver blocks inside a `synchronized` method, which pins the carrier thread on Java 21. With 1 CPU there is only one carrier thread, as the JMC Threads page of run B shows. Raising the carrier count with `-Djdk.virtualThreadScheduler.parallelism=16` (run D) lets the service use its full CPU, so throughput rises by 71% and the average response time falls from 140 ms to 77 ms.
- **Exceptions.** JMC's "Thrown Errors" rule fires on about 70 `NoSuchMethodError` and `IncompatibleClassChangeError` instances thrown by the JVM while linking method handles at startup. None are thrown while the service is under load.

## Files of each run

Each run directory under `<operation>/results/runs/` contains:

| File | Content |
|---|---|
| `jmc-screenshots/` | JDK Mission Control 9.1.2 pages of the recording: automated analysis, Java application, threads, memory, lock instances, socket I/O, method profiling, exceptions, garbage collections, GC summary, TLAB allocations and processes |
| `jmc-automated-analysis.html` | The JMC automated analysis report |
| `charts/` | Heap, GC pauses, CPU, threads, allocation rate and pinned events over time, from the recording |
| `jfr-metrics.json` | The summary line and the figures above |
| `jmeter-dashboard/index.html` | The JMeter HTML report |
| `summary-line.csv` | The run in the `summary.csv` format |
| `docker-stats.csv` | CPU and memory of the service and Db2 containers every 5 seconds |
| `jvm.txt`, `service.log`, `jmeter.log` | JVM version and limits, service output and JMeter log |
| `<run>.jfr`, `results.jtl.gz`, `gc.log.gz` | Raw recording, JMeter samples and GC log. These are kept locally and are not committed |

## Run the tests

1. Build the services in `query_operation/src` and `execute_operation/src` with `bal build`.
2. Start a Db2 server and set its details in `src/Config.toml` (or `BAL_CONFIG_DATA`).
3. Run a test. `tools/run-load-test.sh` starts the service in a container limited to 1 CPU and 512 MiB with a JFR recording, runs JMeter, and collects the files listed above:

   ```bash
   tools/run-load-test.sh A-query-default query_operation http-get-request.jmx 60 600
   tools/run-load-test.sh D-execute-parallelism16 execute_operation http-post-request.jmx 60 300 \
       -Djdk.virtualThreadScheduler.parallelism=16
   ```

4. Summarize a run: `python3 tools/analyze_results.py <run directory>`. This needs the JDK `jfr` tool, `matplotlib`, and JDK Mission Control for the automated analysis report.
5. Capture the JMC pages: build `tools/jmc-headless.Dockerfile` as `jmc-headless` on an x86-64 host and run `tools/jmc-capture-all.sh`, which opens each recording in JMC on a virtual display.

The `deployment` directories hold the Kubernetes manifests used by the `trigger-load-tests` workflow, as in the other connector repositories.
