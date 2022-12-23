import React, { Component } from "react";
import uniqid from "uniqid";
import "./App.css";

import Overview from "./components/Overview";

export default class App extends Component {
  state = {
    task: { id: uniqid(), text: "", order: 0 },
    tasks: [],
    isEdit: false,
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

    if (this.state.isEdit === true) {
      // const tasksWithOutEdited = this.state.tasks.filter(
      //   (task) => task.id !== this.state.task.id
      // );
      // console.log(tasksWithOutEdited);
      this.setState({
        tasks: [
          ...this.state.tasks,
          // { ...this.state.task, id: uniqid(), text: this.state.task.text },
          this.state.task,
        ],
        task: { id: uniqid(), text: "", order: this.state.task.order + 1 },
        isEdit: false,
      });
    }

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

  editTask = (taskId) => {
    const input = document.querySelector("#task");
    input.focus();
    this.setState({
      task: this.state.tasks.find((task) => task.id === taskId),
      isEdit: true,
      tasks: this.state.tasks.filter((task) => task.id !== taskId),
    });
  };

  render() {
    const { tasks, task, isEdit } = this.state;

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
            {isEdit ? "re-submit" : "submit"}
          </button>
        </form>
        <Overview
          tasks={tasks}
          removeHandler={this.removeTask}
          editHandler={this.editTask}
        />
      </div>
    );
  }
}
