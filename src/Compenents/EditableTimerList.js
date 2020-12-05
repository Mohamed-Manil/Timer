import React, { Component } from "react";
import ToggleTimerForm from "./ToggleTimerForm";
import Timer from "./Timer";

class EditableTimerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerList: [],
    };
    this.getInfoTimerForm = this.getInfoTimerForm.bind(this);
  }
  componentDidMount() {
    this.setState({ timerList: [] });
  }
  getInfoTimerForm(title, project, hours, minutes, seconds) {
    console.log(this.state.timerList, "previous");
    this.setState({
      timerList: [
        ...this.state.timerList,
        {
          titleList: title,
          projectList: project,
          hoursList: hours,
          minutesList: minutes,
          secondsList: seconds,
        },
      ],
    });
    console.log(this.state.timerList);
  }
  constructTimer(item) {
    console.log(item.titleList);
    let timer = (
      <div className="p-2 bd-highlight">
        <Timer
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
