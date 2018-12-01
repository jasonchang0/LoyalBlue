import React, { Component } from 'react';
import fire from './config/Fire';
import VideoBackground from './assets/video_bg.mp4'
import './App.css';

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
            <img style={imgStyle} src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/JetBlue_Airways_Logo.svg/2000px-JetBlue_Airways_Logo.svg.png'></img>
        </div>
        <button type="submit" onClick={this.buttonClick} class="btn btn-primary">Begin loyalBlue</button>
    </div>
    );
  }
}
export default TitleComponent;