import React, { Component } from "react";

export default class Overview extends Component {
  render() {
    const { tasks, removeHandler, editHandler } = this.props;

    return (
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{`${task.order}/ ${task.text}`}</p>
            <i
              className="fa-solid fa-delete-left"
              onClick={() => removeHandler(task.id)}
            ></i>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={() => editHandler(task.id)}
            ></i>
          </li>
        ))}
      </ul>
    );
  }
}
