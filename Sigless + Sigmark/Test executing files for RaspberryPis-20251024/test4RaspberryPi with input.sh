#!/bin/bash

	# only real time
TIMEFORMAT=%R

  benchcmd() {
#	for i in 1 2 # for testing
	for i in 1 2 3 4 5 6 7 8 9 10
	do
		echo "$@"  >> runtime.log
		T="$(date +%s%N)"
		eval "$@"
		T="$(($(date +%s%N)-T))"
		T=$((T/1000000))
		echo "${T} ms" >> runtime.log
		sleep 0.1
	done
  }

# calibrating start 
# cat testfile.txt

rm -f runtime.log

echo "[$(date)]" >> runtime.log

FILES1="OfficialTests/test100x100/*"
for f1 in $FILES1
do 
	echo "Processing $f1 file.."
#	for j1 in 0 1 2 3 4 5 10 20 30 40 50 60 70 80 90 100 # for testing
	for j1 in 0 1 2 3 4 5 10 20 30 40 50 60 70 80 90 100 200 300 400 500 600 700 800 900 1000 2000 3000 4000 5000 6000 7000 8000 9000 10000 11000 12000 13000 14000 15000
	do 
		benchcmd ./gol $f1 $j1
	done
done

FILES2="OfficialTests/test200x200/*"
for f2 in $FILES2
do 
	echo "Processing $f2 file.."
#	for j2 in 0 1 2 3 4 5 10 20 30 40 50 60 70 80 90 100  # for testing
	for j2 in 0 1 2 3 4 5 10 20 30 40 50 60 70 80 90 100 200 300 400 500 600 700 800 900 1000 2000 3000 4000 5000 6000 7000 8000 9000 10000 11000 12000 13000 14000 15000 # for real
	do 
		benchcmd ./gol $f2 $j2
	done
done


FILES3="OfficialTests/test300x300/*"
for f3 in $FILES3
do 
	echo "Processing $f3 file.."
#	for j3 in 0 1 2 3 4 5 10 20 30 40 50 60 70 80 90 100  # for testing
	for j3 in 0 1 2 3 4 5 10 20 30 40 50 60 70 80 90 100 200 300 400 500 600 700 800 900 1000 2000 3000 4000 5000 # 6000 7000 8000 9000 10000 11000 12000 13000 14000 15000 # for real 
	do 
		benchcmd ./gol $f3 $j3
	done
done


cat runtime.log