Energy Logger Usage Guide

This document explains how to use the pmic_raw_logger tool and how to generate three different CSV outputs for energy measurement experiments.

⸻

Purpose

The goal is to measure and compare energy consumption across three scenarios:
	1.	No application running → baseline measurement (out.csv)
	2.	Cakeshop without image compression
	3.	Cakeshop with image compression

Each scenario produces its own CSV file for later analysis.

⸻

Running the Energy Logger

The logger is executed with the following command:

./pmic_raw_logger <interval> <output_file.csv>

	•	<interval>: Sampling interval in seconds (e.g., 0.05)
	•	<output_file.csv>: Name of the CSV file where data is stored

⸻

Scenario 1: Baseline (No Application)

This measures the idle energy consumption of the system.

./pmic_raw_logger 0.05 out.csv

Stop the logger manually using:

Ctrl + C


⸻

Scenario 2: Cakeshop WITHOUT Image Compression
	1.	Start the logger in the background:

./pmic_raw_logger 0.05 cakeshop_no_compression.csv &

	2.	Note the process ID (PID):

[1] 6075

	3.	Trigger logging phases using signals:

kill -USR1 6075   # Start measurement phase
kill -USR2 6075   # Mark event (e.g., page load)
kill -USR2 6075   # Additional event markers if needed
kill -TERM 6075   # Stop logging

	4.	Run the Cakeshop application without image compression during this process.

⸻

Scenario 3: Cakeshop WITH Image Compression

Repeat the same steps as above, but save to a different file:

./pmic_raw_logger 0.05 cakeshop_with_compression.csv &

Then use the same signal workflow:

kill -USR1 <PID>
kill -USR2 <PID>
kill -USR2 <PID>
kill -TERM <PID>

Make sure the Cakeshop application is running with image compression enabled.

⸻

File Overview

After running all scenarios, your directory should contain:

ls

Example output:

energylogger_overhead.sh
out.csv
cakeshop_no_compression.csv
cakeshop_with_compression.csv
pmic_raw_logger
pmic_raw_logger3.c


⸻

Notes
	•	Keep the sampling interval consistent across all experiments.
	•	Ensure similar conditions (network, load, etc.) for fair comparison.
	•	Use USR1 and USR2 signals to mark important events in the dataset.

⸻

This setup enables a structured comparison of how image compression impacts energy efficiency in web applications.