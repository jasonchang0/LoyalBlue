import pandas as pd
import glob
import os
import datetime
from datetime import date, datetime, timedelta
from dateutil.rrule import rrule, WEEKLY


def datetime_range(start, end, delta):
    current = start
    while current < end:
        yield current
        current += delta


os.chdir('../data/queue')

airport_list = ['AUH', 'YEG', 'YHZ', 'YUL', 'YYZ_1', 'YYZ_3']

a = date(2017, 12, 1)
b = date(2018, 11, 30)

for airport in airport_list:
    df = pd.DataFrame()

    for dt in rrule(freq=WEEKLY, dtstart=a, until=b):
        date_str = dt.strftime('%m-%d-%Y')

        if df.empty:
            df = pd.read_csv('{}_{}.csv'.format(airport, date_str), sep=',')
            continue

        new_df = pd.read_csv('{}_{}.csv'.format(airport, date_str), sep=',')

        # df.reset_index(inplace=True)
        # new_df.reset_index(inplace=True)

        df = pd.concat([df, new_df.drop(['LocalTime'], axis=1)], axis=1)

    df = df[:-1]

    df.dropna(axis=1, inplace=True)
    df.dropna(axis=0, inplace=True)

    df['LocalTime'] = df.apply(lambda row: row['LocalTime'].replace('*', ''), axis=1)
    df['LocalTime'] = pd.to_datetime(df['LocalTime'], format="%H:%M")
    df['LocalTime'] = df.apply(lambda row: row['LocalTime'].strftime('%H:%M'), axis=1)

    df.sort_values(by=['LocalTime'], axis=0, ascending=True, inplace=True)
    df.set_index(keys=['LocalTime'], drop=True, inplace=True)

    # print(df.head())
    # print(df.tail())
    print(df.columns)

    dts = [dt.strftime('%H:%M') for dt in
           datetime_range(datetime(1900, 1, 1, 0), datetime(1900, 1, 2, 0),
                          timedelta(minutes=30))]

    df = df.reindex(labels=dts, axis=0, fill_value=0)
    print(dts)

    modified_col = [pd.to_datetime(_.split(' ')[0], format='%m/%d/%Y').strftime('%m/%d') for _ in df.columns]
    df.rename(mapper=dict(zip(df.columns, modified_col)), axis=1, inplace=True)

    df = df.reindex_axis(sorted(df.columns), axis=1)

    print(df.head())
    print(df.tail())

    df.reset_index(drop=False, inplace=True)

    # os.chdir('../')
    df.to_csv('../{}_queue_time.csv'.format(airport), index=False)





