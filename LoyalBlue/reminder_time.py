import pandas as pd
import numpy as np
import googlemaps
from datetime import datetime, timedelta
import time
import random
import pickle
import os


def round_to_half_hour(dt):
    if 0 <= dt.minute < 15:
        return dt - timedelta(minutes=dt.minute)

    elif 15 <= dt.minute < 30 or 30 <= dt.minute < 45:
        return dt + timedelta(minutes=30 - dt.minute)

    return dt - timedelta(minutes=dt.minute) + timedelta(hours=1)


def series_to_dict(series):
    dictionary = series.to_dict()
    # print(dictionary)

    try:
        for key in dictionary:
            dictionary[key] = list(dictionary[key].values())[0]
    except IndexError as e:
        return {}

    return dictionary


os.chdir('../data')

user_address = '1353 Calbourne Drive, Walnut, CA 91789'
# user_address = 'Payne Whitney Gymnasium, 70 Tower Pkwy, New Haven, CT 06511'

open_file = open('google_api.pickle', 'rb')
google_api = pickle.load(open_file)
open_file.close()

gmaps = googlemaps.Client(key=google_api)

'''
address: String
airport: 3-letter abbreviation
transport: String
departure: JavaScript date 
'''


def reminder_time(address, airport, transport, departure):
    print(airport)

    try:
        open_file = open('address_book.pickle', 'rb')
        address_book = pickle.load(open_file)
        open_file.close()

    except FileNotFoundError as e:
        airports = pd.read_csv('airports.dat',
                               names=['Airport ID', 'Name', 'City', 'Country', 'IATA', 'ICAO', 'Latitude', 'Longitude',
                                      'Altitude', 'Timezone', 'DST', 'Tz database time zone', 'Type', 'Source'],
                               skiprows=1)

        address_book = dict(zip(airports.IATA, tuple(zip(airports.Latitude, airports.Longitude))))

        print(address_book)

        save_file = open('address_book.pickle', "wb")

        pickle.dump(address_book, save_file)
        save_file.close()

    routes = gmaps.directions(origin=address, destination=address_book[airport], departure_time=departure,
                              mode=transport,
                              traffic_model='best_guess')

    try:
        # transport time to airport in seconds
        transport_time = routes[0]['legs'][0]['duration_in_traffic']['value']
    except KeyError as e:
        print('Error: routes -> {}'.format(routes))
        transport_time = routes[0]['legs'][0]['duration']['value']

    classified = pd.read_csv('airport_features.csv')
    # print(classified.head())
    # print(classified.columns)

    modeled_airports = [classified.Origin_airport[_] for _ in range(6)]
    # print(modeled_airports)

    airport = classified[classified.Origin_airport == airport]
    airport = series_to_dict(airport)
    print(airport)

    model = modeled_airports[int(airport['Labels'])]

    model = classified[classified.Origin_airport == model]
    model = series_to_dict(model)
    print(model)

    scaler = airport['Passengers'] / model['Passengers']
    print(scaler)

    queue_time = pd.read_csv('{}_queue_time.csv'.format(model['Origin_airport']))
    queue_time.fillna(value=0, inplace=True)
    # print(queue_time.head())

    departure = pd.to_datetime(departure, format='%Y/%m/%d %H:%M:%S')
    departure = round_to_half_hour(departure)

    date = departure.strftime('%m/%d')
    print(date)

    time = departure.strftime('%H:%M')
    print(time)

    queue = scaler * list(queue_time[queue_time.LocalTime == time][date])[0]
    print(queue)

    delta_t = timedelta(seconds=transport_time) + timedelta(minutes=queue)

    if delta_t.total_seconds() > 3 * 60 ** 2:
        delta_t = timedelta(hours=3)

    depart_by = departure - delta_t

    return depart_by


if __name__ == '__main__':
    start_time = datetime.now()
    end_time = datetime(2019, 1, 2, 10, 30, 0)
    start_time = reminder_time('Yale University New Haven, CT 06520', 'JFK', 'driving', end_time)
    print('Depart by {} to board the flight by {}'.format(start_time, end_time))
    """
    for _ in range(100):
        start_time = datetime.now()

        year = random.randint(2019, 2025)
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        hour = random.randint(0, 23)
        minute = random.randint(0, 59)
        second = random.randint(0, 59)

        nearby_airports = ['BDL', 'JFK', 'LGA', 'EWR', 'BOS', 'PVD', 'HPN']

        end_time = datetime(year, month, day, hour, minute, second)
        # print(end_time)

        start_time = reminder_time(user_address, random.choice(nearby_airports), 'driving', end_time)
        # end_time = start_time + timedelta(seconds=directions[0]['legs'][0]['duration_in_traffic']['value'])

        print('Depart by {} to board the flight by {}'.format(start_time, end_time))

        # time.sleep(5)
"""




