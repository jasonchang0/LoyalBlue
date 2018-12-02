import pandas as pd
import json
import os
import glob
import ast


os.chdir('../data')

for file in glob.glob('*.json'):
    # reading the JSON data using json.load()
    with open(file) as train_file:
        # dict_train = ast.literal_eval(train_file)
        dict_train = json.load(train_file)

    # converting json dataset from dictionary to dataframe
    train = pd.DataFrame.from_dict(dict_train, orient='index')
    train.reset_index(level=0, inplace=True)

    train.to_csv(file.replace('.json', '.csv'), index=False)







