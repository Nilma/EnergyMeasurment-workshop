#!/bin/bash

APP="$1"
SAMPLEPERIOD=0.05
TS=$(date +"%Y%m%d_%H%M%S")

if [ "$APP" = "cakeshop" ]; then
  OUTFILE="./results/cakeshop/cakeshop_${SAMPLEPERIOD}s_${TS}.csv"
  PERF_OUT="./logs/cakeshop_${SAMPLEPERIOD}s_${TS}_perf.txt"
  WORKLOAD_SCRIPT="../workloads/run_cakeshop_workload.sh"
elif [ "$APP" = "cakeshop-compressed" ]; then
  OUTFILE="./results/cakeshop-compressed/cakeshop_compressed_${SAMPLEPERIOD}s_${TS}.csv"
  PERF_OUT="./logs/cakeshop_compressed_${SAMPLEPERIOD}s_${TS}_perf.txt"
  WORKLOAD_SCRIPT="../workloads/run_cakeshop_compressed_workload.sh"
else
  echo "Usage: $0 cakeshop|cakeshop-compressed"
  exit 1
fi

./pmic_raw_logger "$SAMPLEPERIOD" "$OUTFILE" &
LOGGER_PID=$!
echo "Logger started with PID $LOGGER_PID, logging to $OUTFILE"

sleep 1

kill -USR1 "$LOGGER_PID"
echo "Measurement started"

perf stat -o "$PERF_OUT" \
  -e task-clock,cycles,instructions,cache-misses \
  -- bash "$WORKLOAD_SCRIPT" &
WORK_PID=$!
echo "Workload PID: $WORK_PID"

wait "$WORK_PID"

kill -USR2 "$LOGGER_PID"
echo "Measurement stopped"

kill -TERM "$LOGGER_PID"
wait "$LOGGER_PID"

echo "Done. EnergyLogger data in $OUTFILE"
echo "Perf data in $PERF_OUT"