import pandas as pd
import numpy as np
import json
import os
import glob


def normalize_features(row, weight):
    return row * weight[row['Destination_airport']]


os.chdir('../data')

pos_df = pd.read_csv('airportLatLng.csv')
routes_df = pd.read_csv('routes.txt', sep=',')
airports_df = pd.read_csv('usa_airports.csv')

print(pos_df.head())
print(routes_df.head())
print(airports_df.head())
print(airports_df.shape)

airports = set(routes_df.city1)
airports.update(set(routes_df.city2))
airports.update(set(routes_df.city3))

print(airports)

airports_df = airports_df[airports_df.Origin_airport.isin(airports)]

target_col = ['Origin_airport', 'Destination_airport', 'Passengers', 'Seats',
              'Flights', 'Origin_population', 'Destination_population']

airports_df = airports_df[target_col]
print(airports_df.shape)

pop_sum = sum(list(airports_df.Destination_population))
norm_pop = [float(_) / pop_sum for _ in list(airports_df.Destination_population)]
weighed_dest = dict(zip(airports_df.Destination_airport, norm_pop))
print(weighed_dest)

airports_df['Destination_airport'] = airports_df.apply(lambda row: weighed_dest[row['Destination_airport']], axis=1)

airports_df.rename(index=str, columns={'Destination_airport': 'Weighed_factor'}, inplace=True)

# axis 1 drops columns, 0 will drop rows
airports_df.drop(['Destination_population'], axis=1, inplace=True)
airports_df.drop(['Weighed_factor'], axis=1, inplace=True)

# normalize the features
# airports_df[airports_df.columns[2:]] = airports_df[airports_df.columns[2:]].mul(airports_df['Weighed_factor'], axis=0)

# airports_df.drop(['Origin_population'], axis=1, inplace=True)
# origin_pop = dict(zip(airports_df.Origin_aiport, airports_df.Origin_population))

airports_df = airports_df.groupby(['Origin_airport']).agg({'Origin_population': np.mean, 'Passengers': np.sum,
                                                           'Seats': np.sum, 'Flights': np.sum})

airports_df['Origin_population'] = airports_df['Origin_population'].astype(int)

# airports_df['Origin_airport'] = airports_df.index.values

airports_df.reset_index(inplace=True)
print(airports_df.head())

airports_df.to_csv('airport_features.csv', index=False)





