import React, { Component } from 'react';
import fire from '../config/Fire';
import VideoBackground from '../assets/video_bg.mp4'
import './App.css';
import Logo from '../assets/logo.png'

const imgStyle = {

}

class TitleComponent extends Component {
  constructor(props) {
    super(props);
  }
  buttonClick = () => {
    this.props.onTitleClick('login');            
  }
  render() {
    return (
    <div style={this.props.style}>
        <div>
            <img style={imgStyle} src={Logo}></img>
        </div>
        <button style={{backgroundColor: '#00205b', borderColor: '#00205b', marginTop:'2em'}} type="submit" onClick={this.buttonClick} class="btn btn-primary">Launch Trip Assistant</button>
    </div>
    );
  }
}
export default TitleComponent;