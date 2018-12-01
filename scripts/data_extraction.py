import pandas as pd
import json
import os
import glob

os.chdir('../data')

# reading the JSON data using json.load()
file = 'data.json'
with open(file) as train_file:
    dict_train = json.load(train_file)

# converting json dataset from dictionary to dataframe
train = pd.DataFrame.from_dict(dict_train, orient='index')
train.reset_index(level=0, inplace=True)