import React, { Component } from 'react';
import VideoCover from 'react-video-cover';
import fire from './config/Fire';
import VideoBackground from './assets/video_bg.mp4'
import VideoBackground2 from './assets/video_bg2.mp4'
import './App.css';
import LoginComponent from './LoginComponent';
import TitleComponent from './TitleComponent';

const style = {
  width: '100vw',
  height: '100vh',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const videoStyle = {
  position: 'fixed',
  zIndex: -1,
  opacity: '0.8',
};

const loginStyles = {
  width: "30%",
}

class Main extends Component {
  constructor(props) {
		super(props);
		this.state = {
			isTitleScreen: true,
		};
		this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (title) => {
    this.setState({isTitleScreen: title});
  }

  state = {
    resizeNotifier: () => {},
  }
  render() {
    const videoOptions = {
      src: VideoBackground2,
      autoPlay: true,
      loop: true,
    };
    if (this.state.isTitleScreen) {
			return (
        <div style={style} >
        <TitleComponent onTitleClick={this.handleClick}/>
        <VideoCover
          style={videoStyle}
          videoOptions={videoOptions}
          remeasureOnWindowResize
          getResizeNotifier={resizeNotifier => {
            this.setState({
              resizeNotifier,
            });
          }}
        />
        </div>
				)
		} else {

			return (
          <div style={style} >
            <LoginComponent style={loginStyles}/>
            <VideoCover
              style={videoStyle}
              videoOptions={videoOptions}
              remeasureOnWindowResize
              getResizeNotifier={resizeNotifier => {
                this.setState({
                  resizeNotifier,
                });
              }}
            />
          </div>
        );
		}

		}
	}

export default Main;