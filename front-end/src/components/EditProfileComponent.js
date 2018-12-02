import React, { Component } from 'react';
import fire from '../config/Fire';
import './App.css';


class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      errorMessage: '',
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{
      // Adds user info to the DB when registration is successful
      const userRef = fire.database().ref('user');
      const user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
      }
      userRef.push(user)
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
      })
      
    })
    .catch((error) => {
        console.log('ERR', error);
        this.setState({
          errorMessage: error.message
        })
      })
  }
  
  render() {
    return (
    <div style={this.props.style}>
       <div className="loginBox">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input value={this.state.firstName} onChange={this.handleChange} type="email" name="firstName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Last Name</label>
            <input value={this.state.lastName} onChange={this.handleChange} type="email" name="lastName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter last name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Phone Number</label>
            <input value={this.state.phone} onChange={this.handleChange} type="email" name="phone" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone number" />
            <small id="emailHelp" class="form-text">Phone number for alert message.</small>
          </div>
          <div class="form-group">
            <small style={{color:'red'}} class="form-text">{this.state.errorMessage}</small>
          </div>
          <button type="submit" onClick={this.signup} className="btn btn-success">Signup</button>
        </form>
      </div>
      </div>
    );
  }
}
export default SignupComponent;