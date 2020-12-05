import React, { Component } from "react";
import Timer from "./Compenents/Timer";
import EditableTimer from "./Compenents/EditableTimer";
import ToggleTimerForm from "./Compenents/ToggleTimerForm";
import EditableTimerList from "./Compenents/EditableTimerList";
import TimerDashBoard from "./Compenents/TimerDashboard";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <TimerDashBoard></TimerDashBoard>
      </div>
    );
  }
}

export default App;
