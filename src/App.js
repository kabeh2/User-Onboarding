import React, { Component } from "react";
import "./App.css";
import FormikSignUp from "./components/forms/FormikSignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormikSignUp />
      </div>
    );
  }
}

export default App;
