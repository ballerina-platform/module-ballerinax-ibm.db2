#!/usr/bin/env bash
# Opens each run recording in JDK Mission Control (virtual display) and captures the main pages.
# Working directory with bin/<service>.jar, scripts/<plan>.jmx and results/. Defaults to the current directory.
cd "${LOAD_TEST_HOME:-$PWD}"
shot() { out=$1; shift; docker exec jmc xdotool "$@" mousemove 1590 990; sleep 9; docker exec jmc import -window root /tmp/shot.png && docker cp jmc:/tmp/shot.png "$out" >/dev/null; }
for run in A-query-default B-execute-default C-query-parallelism16 D-execute-parallelism16; do
  dir=results/$run/jmc-screenshots; mkdir -p $dir
  docker rm -f jmc >/dev/null 2>&1
  docker run -d --name jmc -v $PWD/results:/runs jmc-headless sh -c "Xvfb :99 -screen 0 1600x1000x24 >/dev/null 2>&1 & sleep 2; openbox >/dev/null 2>&1 & sleep 1; \"/opt/JDK Mission Control/jmc\" -data /tmp/ws -open /runs/$run/$run.jfr > /tmp/jmc.log 2>&1; sleep infinity" >/dev/null
  for i in $(seq 1 60); do docker exec jmc wmctrl -l 2>/dev/null | grep -q "JDK Mission Control" && break; sleep 2; done
  sleep 15
  docker exec jmc wmctrl -r "JDK Mission Control" -b add,maximized_vert,maximized_horz; sleep 3
  docker exec jmc xdotool mousemove 300 556 click 1; sleep 12
  shot $dir/01-automated-analysis.png mousemove 130 90 click 1
  shot $dir/02-java-application.png mousemove 90 113 click 1
  shot $dir/03-threads.png mousemove 83 136 click 1
  shot $dir/04-memory.png mousemove 84 159 click 1
  shot $dir/05-lock-instances.png mousemove 105 182 click 1
  shot $dir/06-socket-io.png mousemove 90 228 click 1
  shot $dir/07-method-profiling.png mousemove 110 251 click 1
  shot $dir/08-exceptions.png mousemove 93 274 click 1
  shot $dir/09-garbage-collections.png mousemove 122 343 click 1
  shot $dir/10-gc-summary.png mousemove 100 389 click 1
  shot $dir/11-tlab-allocations.png mousemove 112 481 click 1
  shot $dir/12-processes.png mousemove 90 527 click 1
  echo "captured $run: $(ls $dir | wc -l) screenshots"
done
docker rm -f jmc >/dev/null
echo CAPTURE_DONE
