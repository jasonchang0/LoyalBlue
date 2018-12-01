from sklearn.metrics.pairwise import pairwise_distances
from sklearn.neighbors import nearest_centroid
import pandas as pd
import numpy as np
import os


os.chdir('../data')

df = pd.read_csv('airport_features.csv')

train_x = df[:6]
train_x_airports = train_x['Origin_airport']
train_x.drop('Origin_airport', axis=1, inplace=True)

test_x = df[6:]
test_x_airports = test_x['Origin_airport']
test_x.drop('Origin_airport', axis=1, inplace=True)

print(train_x.head())
print(test_x.head())



