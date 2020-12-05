import React, { Component } from "react";
import ToggleTimerForm from "./ToggleTimerForm";
import { unmountComponentAtNode, findDOMNode } from "react-dom";
import Timer from "./Timer";
import uniqid from "uniqid";

class EditableTimerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerList: [],
    };
    this.getInfoTimerForm = this.getInfoTimerForm.bind(this);
    this.handleUnmountChildTimer = this.handleUnmountChildTimer.bind(this);
  }
  componentDidMount() {
    this.setState({ timerList: [] });
  }
  getInfoTimerForm(title, project, hours, minutes, seconds) {
    this.setState({
      timerList: [
        ...this.state.timerList,
        {
          titleList: title,
          projectList: project,
          hoursList: hours,
          minutesList: minutes,
          secondsList: seconds,
          idTimer: uniqid(),
        },
      ],
    });
  }
  handleUnmountChildTimer(uCid) {
    console.log(uCid, "Parent");
    let newList = this.state.timerList;
    console.log(newList, "Timerlist");
    this.setState({
      timerList: this.state.timerList.filter((item) => {
        return item.idTimer !== uCid;
      }),
    });
    //unmountComponentAtNode(document.getElementById("GG"));
  }
  constructTimer(item) {
    let timer = (
      <div className="p-2 bd-highlight" id={item.idTimer}>
        <Timer
          idDiv={item.idTimer}
          onDelete={this.handleUnmountChildTimer}
          title={item.titleList}
          project={item.projectList}
          countdown={{
            h: item.hoursList,
            m: item.minutesList,
            s: item.secondsList,
          }}
        ></Timer>
      </div>
    );
    return timer;
  }
  mapListTimer() {
    if (this.state.timerList) {
      this.state.timerList.map((element) => {
        this.constructTimer(element);
      });
    }
  }
  render() {
    return (
      <div className="d-flex flex-column-reverse bd-highlight mb-3">
        <div className="p-2 bd-highlight mx-auto">
          <ToggleTimerForm onAdd={this.getInfoTimerForm}></ToggleTimerForm>
        </div>
        {typeof this.state.timerList !== undefined ? (
          this.state.timerList.map((item) => this.constructTimer(item))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default EditableTimerList;
