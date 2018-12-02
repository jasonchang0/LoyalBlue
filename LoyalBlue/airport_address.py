import pandas as pd
import pickle
import os


os.chdir('../data')

airports = pd.read_csv('airports.dat',
                       names=['Airport ID', 'Name', 'City', 'Country', 'IATA', 'ICAO', 'Latitude', 'Longitude',
                              'Altitude', 'Timezone', 'DST', 'Tz database time zone', 'Type', 'Source'], skiprows=1)

address_book = dict(zip(airports.IATA, tuple(zip(airports.Latitude, airports.Longitude))))

print(address_book)

save_file = open('address_book.pickle', "wb")

pickle.dump(address_book, save_file)
save_file.close()





