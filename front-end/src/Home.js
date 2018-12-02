import React, { Component } from 'react';
import fire from './config/Fire';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Navbar from './common/Navbar'
import HorizontalForm from './components/HorizontalForm';
import './Home.css'

const mapStyle = {
  height: '50%',
  width: '60%',
  position: 'relative !important',
  left: '0',
  right: '0',
  margin: 'auto',
}
const divStyle = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
}

const headerStyle = {
  color: 'white'
}

const style = {
  width: '100vw',
  height: '100vh',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <Navbar/>
      <div style={divStyle}>
      
      <Map
              style={mapStyle}
      google={this.props.google}
      initialCenter={{
          lat: 42.39,
          lng: -72.52
      }}>
     
  </Map> 
  <HorizontalForm/></div>
      </div>

    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('')
})(Home)