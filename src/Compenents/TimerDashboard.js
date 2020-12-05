import React, { Component } from "react";
import EditableTimerList from "./EditableTimerList";
class TimerDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const styleWraper = {
      width: "40%",
    };
    return (
      <div className="mx-auto w-50">
        <EditableTimerList></EditableTimerList>
      </div>
    );
  }
}

export default TimerDashBoard;
