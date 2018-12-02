// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import fire from '../../config/Fire';
import './styles.css';
import Logo from '../../assets/logo2.png'

class Navbar extends React.Component {

  constructor(props) {
		super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state ={
      firstName: '',
      userInfo: null
    }
	}

  handleLogout() {
    fire.auth().signOut();
  }

  render() {

      return(
        <div className="navbar">
          <div className="logo-container">
            <img src={Logo}></img>
          </div>
          
          <div className="left-link-container">
          </div>
  
          <div className="right-link-container">
            <span style={{color:'white'}} onClick={this.handleLogout}>Sign Out</span>
            <span style={{color:'white', marginRight:'2em'}} onClick={this.handleLogout}>Welcome!</span>  
          </div>
        </div>
      );
    } 
  
}

export default Navbar;