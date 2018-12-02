import React, { Component } from 'react';
import VideoCover from 'react-video-cover';
import fire from './config/Fire';
import VideoBackground from './assets/video_bg.mp4'
import VideoBackground2 from './assets/video_bg2.mp4'
import './App.css';
import LoginComponent from './components/LoginComponent';
import TitleComponent from './components/TitleComponent';
import SignupComponent from './components/SignupComponent';

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
			currentScreen: 'title',
		};
		this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (title) => {
    this.setState({currentScreen: title});
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
    if (this.state.currentScreen == 'title') {
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
		} else if (this.state.currentScreen == 'login') {

			return (
          <div style={style} >
            <LoginComponent style={loginStyles} onTitleClick={this.handleClick}/>
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
		} else if (this.state.currentScreen == 'signup') {

			return (
          <div style={style} >
            <SignupComponent style={loginStyles}/>
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