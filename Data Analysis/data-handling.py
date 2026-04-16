import pandas as pd
import os
import numpy as np
from scipy import integrate
import argparse

list_of_metadataframes = []
list_of_dataframes = []
energy_columns= ['3V7_WL_SW','3V3_SYS','1V8_SYS','DDR_VDD2','DDR_VDDQ',
                        '1V1_SYS','0V8_SW','VDD_CORE','3V3_DAC','3V3_ADC','0V8_AON','HDMI','Total Energy']

parser = argparse.ArgumentParser()
parser.add_argument("input_file", help="Path to input CSV file")
args = parser.parse_args()

file_name = args.input_file


df = pd.read_csv(file_name,header=0) # read csv file into Data Frame
        
# filter to only active measurements
df = df[df['active']==1]
df = df.reset_index(drop=True)
        
# compute the power dissipation for each of the rails 
df['3V7_WL_SW']= df['3V7_WL_SW_A current(0)']*df['3V7_WL_SW_V volt(8)']
df['3V3_SYS']= df['3V3_SYS_A current(1)']*df['3V3_SYS_V volt(9)']
df['1V8_SYS']= df['1V8_SYS_A current(2)']*df['1V8_SYS_V volt(10)']
df['DDR_VDD2']= df['DDR_VDD2_A current(3)']*df['DDR_VDD2_V volt(11)']
df['DDR_VDDQ']= df['DDR_VDDQ_A current(4)']*df['DDR_VDDQ_V volt(12)']
df['1V1_SYS']= df['1V1_SYS_A current(5)']*df['1V1_SYS_V volt(13)']
df['0V8_SW']= df['0V8_SW_A current(6)']*df['0V8_SW_V volt(14)']
df['VDD_CORE']= df['VDD_CORE_A current(7)']*df['VDD_CORE_V volt(15)']
df['3V3_DAC']= df['3V3_DAC_A current(17)']*df['3V3_DAC_V volt(20)']
df['3V3_ADC']= df['3V3_ADC_A current(18)']*df['3V3_ADC_V volt(21)']
df['0V8_AON']= df['0V8_AON_A current(16)']*df['0V8_AON_V volt(19)']
df['HDMI']= df['HDMI_A current(22)']*df['HDMI_V volt(23)']
df['Total Energy'] = (df['3V7_WL_SW']+df['3V3_SYS']+df['1V8_SYS']+df['DDR_VDD2']+df['DDR_VDDQ']+
              df['1V1_SYS']+df['0V8_SW']+df['VDD_CORE']+df['3V3_DAC']+df['3V3_ADC']+df['0V8_AON']+df['HDMI'])
                    
duration = df['duration_s'].max()-df['duration_s'].min()
df_summary = pd.DataFrame.from_dict(data={'filename':[file_name], 'duration': [duration]})  

# use trapezoids to calculate the area under the curve 
for channel in energy_columns:
    # When we want to compute the energy consumption for the different channels
    x = df['duration_s'] # timesteps
    y = df[channel] # Power Dissipation for channel in Watt 
    y_int = integrate.cumulative_trapezoid(y, x, initial=0) #accumulated area under the curve for each timestemp
    energy = y_int[-1]  #area under the curve
    df_summary[channel]= [energy]


# print results
pd.options.display.float_format = '{:.1f}'.format
#print(dfs.to_string())

for index, row in df_summary.iterrows():
	print(row.round(1).to_string())
	print("-" * 50)
