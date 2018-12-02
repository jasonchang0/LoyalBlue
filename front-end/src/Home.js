import React, { Component } from 'react';
import fire from './config/Fire';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Navbar from './common/Navbar'
import HorizontalForm from './components/HorizontalForm';
import './Home.css'
import VideoBackground from './assets/video_bg.mp4'
import airportLatLng from './data/airportLatLng.js';

const mapStyle = {
  marginTop: '15em',
  height: '50%',
  width: '100%',
  position: 'relative',
  left: '0',
  right: '0',
  margin: 'auto',
}

const divStyle = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}

const videoStyle = {
  position: 'fixed',
  zIndex: -1,
  opacity: '0.8',
};

const headerStyle = {
  color: 'white'
}

var style = {
  backgroundColor: "#00205b",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "50px",
  width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function Footer({ children }) {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        {children}
      </div>
    </div>
  )
}
class Home extends Component {

  constructor(props) {
    super(props);
    this.logout.bind(this);
    this.state = {
      userInfo: '',
      latLngData: null,
      selectedAirport: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      resultText: '',
      userPhone: '',
    }
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedAirport: props.name,
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  logout() {
    fire.auth().signOut();
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({userInfo: user});
      } else {
        this.setState({user:null});

      }
    });

    const userRef = fire.database().ref('user');
    userRef.on('value', (snapshot) => {
      for(let userItem in snapshot.val()) {
        if (snapshot.val()[userItem].email === this.state.userInfo.email) {
          this.setState({
            userPhone: snapshot.val()[userItem].phone
          })
        }
      }
    });
    // Fetch airport data from json
    var arr = []
    for (let data in airportLatLng) {
      arr.push({ 'name': data, 'lat': airportLatLng[data]['lat'], 'lng': airportLatLng[data]['lng'] })
    }
    this.setState({
      latLngData: arr,
    })
  }
  render() {
    console.log(this.state.userPhone)
    if (this.state.latLngData != undefined && this.state.selectedAirport != undefined && this.state.userPhone != undefined) {
      return (
        <div>
          <Navbar styles={{ 'marginBottom': '2em' }} />
          <div style={divStyle}>
            <Map
              style={mapStyle}
              google={this.props.google}
              zoom={4}
              initialCenter={{
                lat: 37,
                lng: -92
              }}>
              {this.state.latLngData.map(item =>
                <Marker
                  onClick={this.onMarkerClick}
                  name={item.name}
                  position={{ lat: item['lat'], lng: item['lng'] }} />
                  
              )}
              <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
            </Map>
            <HorizontalForm phoneNum={this.state.userPhone} selectedApt={this.state.selectedAirport}/>
            <div>
              <h2>{this.state.resultText}</h2>
            </div>
          </div>
          <Footer />
        </div>

      );
    } else {
      return (

        <div>
        </div>

      );
    }

  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBCVcHpG94JKXC9tMn23AaaW3i4ga1ICis')
})(Home)