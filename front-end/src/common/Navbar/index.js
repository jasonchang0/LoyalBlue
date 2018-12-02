// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import fire from '../../config/Fire';
import './styles.css';

class Navbar extends React.Component {

  constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

  handleLogout() {
    fire.auth().signOut();
  }

  render() {

      return(
        <div className="navbar">
          <div className="logo-container">
          </div>
          
          <div className="left-link-container">
          </div>
  
          <div className="right-link-container">
            <span style={{color:'white'}} onClick={this.handleLogout}>Sign Out</span>
            <span style={{color:'white', marginRight:'2em'}} onClick={this.handleLogout}>Edit Profile</span>
            <span style={{color:'white', marginRight:'2em'}} onClick={this.handleLogout}>Welcome, YJ!</span>  
          </div>
        </div>
      );
    } 
  
}

export default Navbar;