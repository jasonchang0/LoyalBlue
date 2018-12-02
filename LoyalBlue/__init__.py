from flask import Flask, jsonify, request
import sys
from reminder_time import reminder_time
from flask_cors import CORS
import json
from datetime import datetime, timedelta
from twilio_helper import send_message

app = Flask(__name__)

@app.route('/')
def homepage():
    return "Hi there, how ya doin?"

@app.route('/predict', methods=['GET', 'POST'])
def api_call():
    try:
        data = request.data
        dataDict = json.loads(data)
        fullname = dataDict['fullname']
        firstname = fullname.split(' ')[0]
        address = dataDict['address']
        airport = dataDict['airport']
        date = dataDict['date']
        year = dataDict['date'][:4]
        month = dataDict['date'][5:7] if int(dataDict['date'][5:7]) > 9 else dataDict['date'][6:7]
        day = dataDict['date'][8:10] if int(dataDict['date'][8:10]) > 9 else dataDict['date'][9:10]
        hr = dataDict['date'][11:13] if int(dataDict['date'][11:13]) > 9 else dataDict['date'][12:13]
        minute = dataDict['date'][14:16] if int(dataDict['date'][14:16]) > 9 else dataDict['date'][15:16]
        date_obj = datetime(int(year), int(month), int(day), int(hr), int(minute))
        transportation = dataDict['transportation']
        print(address, airport, date_obj, transportation)

        start_time = reminder_time(address, airport, transportation, date_obj)
        result = 'Hi {}, \n\t Just a kindly reminder from The LoyalBlue Membership. We recommend you to leave your place by {} to board your flight at {} that departs at {}. \n Sincerely, \n The LoyalBlue Customer Service.'.format(firstname, start_time,
        airport, date_obj)
        # result = 'Depart by {} to board the flight by {}'.format(start_time, date_obj)

        return result

    except Exception as e:

        raise e

@app.route('/sms', methods=['GET', 'POST'])
def send_sms():
    try:
        data = request.data
        dataDict = json.loads(data)
        number = dataDict['number']
        body = dataDict['body']
        
        send_message(number, body)

        return 'SENT'

    except Exception as e:
        raise e

# Cross Origin Resource Sharing (CORS) support for the flask backend

CORS(app=app, supports_credentials=True)
if __name__ == "__main__":
    app.run()
