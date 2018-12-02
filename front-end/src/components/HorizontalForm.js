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
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div style={{ 'marginTop': '23em' }} className="container formBox">
                    <h4>Tell me where you are going!</h4>
                    <form role="form">
                        <div className="row">
                            <div className="col-md-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Leaving From</label>
                                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="helper" class="form-text">From where you are leaving for the airport?</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Departing Airport</label>
                                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="helper" class="form-text">Where are you taking the flight?</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Flight Time</label>
                                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="helper" class="form-text">When is the flight time?</small>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Transportation</label>
                                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="helper" class="form-text">How are you getting to the airport?</small>
                                </div>
                            </div>
                        </div>

                        <button type="submit" onClick={this.login} class="btn btn-warning">Alert Departure Time</button>
                    </form>


                </div>
            </div>
        );
    }
}
export default HorizontalForm;