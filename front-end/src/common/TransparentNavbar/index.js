// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import fire from '../../config/Fire';
import './styles.css';

class TransparentNavbar extends React.Component {

  constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

  handleLogout() {
    fire.auth().signOut();
  }

  render() {

      return(
        <div className="trans_navbar">
          <div className="logo-container">
          </div>
          
          <div className="left-link-container">
            <span style={{color:'white'}} onClick={this.handleLogout}>Sign Out</span>
          </div>
  
          <div className="right-link-container">

          </div>
        </div>
      );
    } 
  
}

export default TransparentNavbar;