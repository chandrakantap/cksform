import React, { Component } from "react";
import { hot } from "react-hot-loader";
import RegistrationForm from './components/RegistrationForm';
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Simple Form</h1>
                <RegistrationForm />
            </div>
        );
    }
}

export default hot(module)(App);