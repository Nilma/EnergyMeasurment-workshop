# Energy Data Processing 

This script processes a single CSV file containing power measurements and calculates energy consumption per power rail using numerical integration.

The script reads a single CSV file containing time-series power measurements, computes instantaneous power for multiple voltage rails, and integrates the power over time to estimate energy consumption.

Energy is calculated using numerical trapezoidal integration.


## Usage

Run the script with a CSV file as input:

```bash
python data-handling.py path/to/input_file.csv
```
An example could be
```bash
python data-handling.py out.csv
```

## Requirements

- Python 3.8+
- NumPy
- Pandas
- SciPy

### Install dependencies:

```bash
pip install numpy pandas scipy
```