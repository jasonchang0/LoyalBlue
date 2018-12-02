import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Main from './Main';
import Home from './Home'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.authListner();
  }

  authListner() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({user});
      } else {
        this.setState({user:null});

      }
    });
  }
  render() {
    return (
      <div className="App">
    { this.state.user ? (<Home/>) : (<Main/>) }
      </div>
    );
  }
}

export default App;
