import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  state = {
    tasks: [],
  };

  render() {
    return (
      <div className="App">
        <form className="form">
          <div className="form-group">
            <label htmlFor="task" className="form-label">
              Input Task
            </label>
            <input
              id="task"
              type="text"
              placeholder="input here"
              className="form-control"
            />
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
