import React, { Component } from 'react';
import fire from '../config/Fire';
import './App.css';
import Select from 'react-select';
import PlacesAutocomplete from 'react-places-autocomplete';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import cities from '../data/cities';

const transportationOptions = [
    { 'value': 'driving', 'label': 'Driving' },
    { 'value': 'walking', 'label': 'Walking' },
    { 'value': 'bicycling', 'label': 'Biking' },
    { 'value': 'transit', 'label': 'Transit' },
]

const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#ffc107' : '#00205b',
    }),
}

class HorizontalForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            selectedAirport: this.props.selectedAirport,
            selectedOption: null,
            selectedTrans: null,
            selectedAddress: null,
            address: '',
            addressOptions: [],
            options: [],
            date: null,
            show: false,
        }
    }

    componentDidMount() {
        // Fetch airport data from json
        var arr = []
        for (let data in cities['Airports']) {
            arr.push({ 'value': data, 'label': cities['Airports'][data]['Name'] + ' - ' + data })
        }
        this.setState({
            options: arr
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleAddressChange(e) {

        this.setState({ address: e.target.value });

    }

    handleDateChange = (date) => {
        this.setState({ date });
    }
    handleTransChange = (selectedTrans) => {
        this.setState({ selectedTrans });
    }

    buttonClick = () => {
        this.props.onTitleClick('signup');
    }

    handleAddressSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    submitForm(e) {
        e.preventDefault();
        // Format Address First
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.address + '&key=AIzaSyDtjpZsOSLjHzFbVBO44XIAe6blIkx3xmw')
            .then(res => {
                this.setState({
                    address: res.data.results[0].formatted_address
                })
                console.log(
                    res.data.results[0].formatted_address, this.state.selectedOption, this.state.date, this.state.selectedTrans)
            })
        
        // Call our ML API
        
    }

    render() {
        const { selectedOption, selectedTrans, selectedAirport } = this.state;
        return (
            <div>
                <div style={{ 'marginTop': '23em' }} className="container formBox">
                    <h4 style={{marginBottom:'1em'}}>Tell me where you are going!</h4>
                    <form role="form">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Leaving From</label>
                                    <input value={this.state.address} onChange={this.handleAddressChange} type="text" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="helper" className="form-text">From where you are leaving for the airport?</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Departing Airport</label>
                                    <Select
                                        styles={selectStyles}
                                        value={selectedAirport}
                                        onChange={this.handleChange}
                                        options={this.state.options}
                                    />
                                    <small id="helper" class="form-text">Where are you taking the flight?</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Flight Time</label>
                                    <input value={this.state.email} onChange={this.handleDateChange} type="datetime-local" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="helper" class="form-text">When is the flight time?</small>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Transportation</label>
                                    <Select
                                        styles={selectStyles}
                                        value={selectedTrans}
                                        onChange={this.handleTransChange}
                                        options={transportationOptions}
                                    />
                                    <small id="helper" class="form-text">How are you getting to the airport?</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        </div>

                        <button type="submit" onClick={this.submitForm} class="btn btn-warning">Alert Departure Time</button>
                    </form>


                </div>
            </div>
        );
    }
}
export default HorizontalForm;