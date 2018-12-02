import React, { Component } from 'react';
import fire from '../config/Fire';
import './App.css';

class HorizontalForm extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  buttonClick = () => {
    this.props.onTitleClick('signup');            
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }
  
  render() {
    return (
    <div>
       <div className="loginBox">
       <form role="form">
            <div className="form-group">
            <label className="col-md-2 control-label">Type</label>
            <div className="col-md-3">
                <input type="text" className="form-control" id="inputType" placeholder="Type"/>
            </div>
            </div>
            <div className="form-group">
                <span className="col-md-2 control-label">Metadata</span>
                <div className="col-md-6">
                    <div className="form-group row">
                        <label   className="col-md-1 control-label">Key</label>
                        <div className="col-md-2">
                            <input type="text" className="form-control" id="inputKey" placeholder="Key"/>
                        </div>
                        <label className="col-md-1 control-label">Value</label>
                        <div className="col-md-2">
                            <input type="text" className="form-control" id="inputValue" placeholder="Value"/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
 
       </div>
    </div>
    );
  }
}
export default HorizontalForm;