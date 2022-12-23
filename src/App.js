import React, { Component } from "react";
import uniqid from "uniqid";
import "./App.css";

import Overview from "./components/Overview";

export default class App extends Component {
  state = {
    task: { id: uniqid(), text: "", order: 0 },
    tasks: [],
  };

  // submitHandler = (evt) => {
  //   evt.preventDefault();
  //   const formData = new FormData(evt.target);
  //   for (const value of formData.values()) {
  //     // this.setState((state) => ({ tasks: [...state.tasks, value] }));
  //     // *use functions updater to update state when, 1 field in current state
  //     // *need another field to be updated. However, this state is not updated yet
  //     // *that another field need to be updated too in the same render cycle
  //     this.setState({ tasks: [...this.state.tasks, value] });
  //   }
  //   evt.target.reset();
  // };

  handleChange = (evt) => {
    // this.setState({
    //   task: {
    //     id: this.state.task.id,
    //     text: evt.target.value,
    //     order: this.state.task.order,
    //   },
    // });
    this.setState({
      task: { ...this.state.task, text: evt.target.value },
    });
  };

  onSubmitTask = (evt) => {
    evt.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat({
        ...this.state.task,
        order: this.state.task.order + 1,
      }),
      task: { id: uniqid(), text: "", order: this.state.task.order + 1 },
    });
  };

  removeTask = (taskId) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== taskId),
    });
  };

  render() {
    const { tasks, task } = this.state;

    return (
      <div className="App">
        <form className="form" onSubmit={this.onSubmitTask}>
          <div className="form-group">
            <label htmlFor="task" className="form-label">
              Input Task
            </label>
            <input
              name="task"
              id="task"
              type="text"
              value={task.text}
              placeholder="input here"
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="form-submit">
            Submit
          </button>
        </form>
        <Overview tasks={tasks} removeHandler={this.removeTask} />
      </div>
    );
  }
}
