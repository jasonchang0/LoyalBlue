import React, { Component } from 'react';
import fire from './config/Fire';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Navbar from './common/Navbar'
import HorizontalForm from './components/HorizontalForm';
import './Home.css'
import VideoBackground from './assets/video_bg.mp4'
import VideoCover from 'react-video-cover';

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
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    const videoOptions = {
      src: VideoBackground,
      autoPlay: true,
      loop: true,
    };
    return (
      <div>
        <Navbar styles={{ 'marginBottom': '2em' }} />
        <div style={divStyle}>
          <Map
            style={mapStyle}
            google={this.props.google}
            initialCenter={{
              lat: 42.39,
              lng: -72.52
            }}>
          </Map>
          <HorizontalForm />
        </div>
        <Footer />
      </div>

    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBCVcHpG94JKXC9tMn23AaaW3i4ga1ICis')
})(Home)