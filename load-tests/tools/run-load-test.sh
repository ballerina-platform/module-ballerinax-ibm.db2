#!/usr/bin/env bash
# Runs one ibm.db2 load test the way the WSO2 connector load tests do: a Ballerina HTTP service using the
# connector (1 CPU, 512 MiB, like Cloud.toml) under a JMeter thread group, with a JFR recording of the service.
# Usage: run-load-test.sh <name> <service: query_operation|execute_operation> <jmx> <users> <seconds> [extra JVM options]
set -u
name=$1; service=$2; jmx=$3; users=$4; duration=$5; shift 5; extra="$*"
# Working directory with bin/<service>.jar, scripts/<plan>.jmx and results/. Defaults to the current directory.
cd "${LOAD_TEST_HOME:-$PWD}"
out=results/$name; rm -rf $out; mkdir -p $out; chmod 777 $out
docker rm -f lt-svc >/dev/null 2>&1
cfg=$(printf "dbHost=\"127.0.0.1\"\ndbUsername=\"db2inst1\"\ndbPassword=\"Test123#\"\ndbName=\"TESTDB\"\ndbPort=50000\n")
docker run -d --name lt-svc --user $(id -u):$(id -g) -e HOME=/tmp --network host --cpus=1 --memory=512m -e BAL_CONFIG_DATA="$cfg" -v $PWD:/work -w /work eclipse-temurin:21-jre \
  java -XX:StartFlightRecording=name=loadtest,settings=profile,filename=/work/$out/$name.jfr,dumponexit=true \
       -XX:FlightRecorderOptions=stackdepth=96 -Xlog:gc*:file=/work/$out/gc.log:time,uptime:filecount=2,filesize=20m \
       $extra -jar bin/$service.jar > /dev/null
for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:9092/customer?id=1" -X GET && break; sleep 1; done
docker exec lt-svc java -version 2>&1 | head -1 > $out/jvm.txt
docker exec lt-svc sh -c "nproc; java -XX:+PrintFlagsFinal -version 2>/dev/null | grep -E \" MaxHeapSize | ActiveProcessorCount \"" >> $out/jvm.txt
echo "service: $service users: $users duration: $duration extra: $extra" >> $out/jvm.txt
# resource sampling of the service and the database containers
( while docker inspect lt-svc >/dev/null 2>&1; do docker stats --no-stream --format "{{.Name}},{{.CPUPerc}},{{.MemUsage}}" lt-svc db2-test | sed "s/^/$(date -u +%s),/"; sleep 5; done ) > $out/docker-stats.csv 2>/dev/null &
sampler=$!
docker run --rm --user $(id -u):$(id -g) -e HOME=/tmp --network host -v $PWD:/work -w /work justb4/jmeter:latest -n -t scripts/$jmx -l $out/results.jtl \
  -Jusers=$users -Jduration=$duration -JrampUpPeriod=60 -Jhost=127.0.0.1 -Jport=9092 -e -o $out/jmeter-dashboard > $out/jmeter.log 2>&1
docker exec lt-svc sh -c "jcmd 1 GC.heap_info" > $out/heap-info-end.txt 2>&1
docker stop -t 30 lt-svc >/dev/null; docker logs lt-svc > $out/service.log 2>&1; docker rm lt-svc >/dev/null
kill $sampler 2>/dev/null
ls -la $out | head -20
echo "DONE $name"
