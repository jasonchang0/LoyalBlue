import React, { Component } from 'react';
import fire from '../config/Fire';
import VideoBackground from '../assets/video_bg.mp4'
import './App.css';
import Logo from '../assets/logo.png'

const imgStyle = {
    width: '30%',
    height: '30%'
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
        <button type="submit" onClick={this.buttonClick} class="btn btn-primary">Begin loyalBlue</button>
    </div>
    );
  }
}
export default TitleComponent;