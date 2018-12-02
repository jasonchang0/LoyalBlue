from sklearn.metrics.pairwise import pairwise_distances
from sklearn.neighbors import NearestCentroid
from sklearn import preprocessing
import pandas as pd
import numpy as np
import os


os.chdir('../data')

df = pd.read_csv('airport_features.csv')

airports = df['Origin_airport']
x = df.drop(['Origin_airport', 'Labels'], axis=1, inplace=False)

scaler = preprocessing.StandardScaler()
x = scaler.fit_transform(x)

train_x = x[:6]
# train_x_airports = train_x['Origin_airport']
# train_x.drop('Origin_airport', axis=1, inplace=True)

test_x = x[6:]
# test_x_airports = test_x['Origin_airport']
# test_x.drop('Origin_airport', axis=1, inplace=True)

print(train_x[:5])
print(test_x[:5])

train_y = [_ for _ in range(6)]

clf = NearestCentroid(metric='cosine')
clf.fit(train_x, train_y)

test_y = clf.predict(test_x)

# x = x.insert(0, 'Origin_airport', airports)

print(train_y)
print(test_y)

df['Labels'] = list(np.array(train_y).flatten()) + list(np.array(test_y).flatten())
print(df.head())

df.to_csv('airport_features.csv', index=False)




