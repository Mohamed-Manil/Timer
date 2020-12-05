import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EditableTimer from "./EditableTimer";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      project: this.props.project,
      countdown: this.timerFormater(),
      isToggleUpdate: false,
    };
    this.editTimer = this.editTimer.bind(this);
    this.cancelUpdateTimer = this.cancelUpdateTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  componentDidMount() {
    let timer = this.timerFormater();
    let stop = moment("000000", "HHmmss");
    stop = stop.format("HH:mm:ss");
    let interval = setInterval(() => {
      if (
        moment(timer, "HH:mm:ss").valueOf() ===
        moment(stop, "HH:mm:ss").valueOf()
      ) {
        clearInterval(interval);
        return 0;
      }
      timer = moment(timer, "HH:mm:ss")
        .subtract(1, "seconds")
        .format("HH:mm:ss");
      this.setState({ countdown: timer });
      //console.log(moment(timer, 'HH:mm:ss'), moment(stop, 'HH:mm:ss'))
    }, 1000);
  }

  timerFormater() {
    let hours = ("0" + this.props.countdown.h).slice(-2);
    let minutes = ("0" + this.props.countdown.m).slice(-2);
    let seconds = ("0" + this.props.countdown.s).slice(-2);
    let date = moment(`${hours}${minutes}${seconds}`, "HHmmss");
    date = date.format("HH:mm:ss");
    return date;
  }

  editTimer(e) {
    e.preventDefault();
    this.setState({ isToggleUpdate: !this.state.isToggleUpdate });
  }

  cancelUpdateTimer() {
    this.setState({ isToggleUpdate: !this.state.isToggleUpdate });
  }
  updateTimer(titleUpdate, projectUpdate) {
    this.setState({
      title: titleUpdate,
      project: projectUpdate,
      isToggleUpdate: !this.state.isToggleUpdate,
    });
  }

  render() {
    return this.state.isToggleUpdate ? (
      <EditableTimer
        onCancel={this.cancelUpdateTimer}
        onUpdate={this.updateTimer}
      ></EditableTimer>
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{this.state.title}</h4>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <h6>{this.state.project}</h6>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 text text-center">
            <h2>{this.state.countdown}</h2>
          </div>
        </div>
        <div className="row justify-content-end mb-3">
          <div className="col-1">
            <a href="#" className="text-dark" onClick={this.editTimer}>
              <FontAwesomeIcon icon={faEdit} />
            </a>
          </div>
          <div className="col-1">
            <a href="#" className="text-dark">
              <FontAwesomeIcon icon={faTrash} />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-outline-danger w-100">
              Stop
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
