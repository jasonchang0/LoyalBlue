import pandas
import numpy as np
import googlemaps
from datetime import datetime, timedelta
import pickle
import os

os.chdir('../data')

user_address = 'Payne Whitney Gymnasium, 70 Tower Pkwy, New Haven, CT 06511'

gmaps = googlemaps.Client(key='AIzaSyBCVcHpG94JKXC9tMn23AaaW3i4ga1ICis')

'''
address: String
airport: 3-letter abbreviation
transport: String
departure: JavaScript date 
'''


def reminder_time(address, airport, transport, departure):
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

    routes = gmaps.directions(origin=address, destination=address_book[airport], departure_time=departure, mode=transport,
                        traffic_model='best_guess')

    return routes


if __name__ == '__main__':
    start_time = datetime.now()
    directions = reminder_time(user_address, 'BDL', 'driving', start_time)
    end_time = start_time + timedelta(seconds=directions[0]['legs'][0]['duration_in_traffic']['value'])
    print('Arrive by {}'.format(end_time))

