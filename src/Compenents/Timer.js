import React, { Component } from "react";
import { unmountComponentAtNode, findDOMNode } from "react-dom";
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
      timerId: null,
      pausResumeLabel: "Stop",
      pauseResumeStyle: "btn btn-outline-danger w-100",
      isRunning: true,
    };
    this.editTimer = this.editTimer.bind(this);
    this.cancelUpdateTimer = this.cancelUpdateTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.pauseResumeTimer = this.pauseResumeTimer.bind(this);
    this.hadnleUnmount = this.hadnleUnmount.bind(this);
  }

  componentDidMount() {
    let timer = this.timerFormater();
    let stop = moment("000000", "HHmmss");
    stop = stop.format("HH:mm:ss");
    this.setState({
      timerId: setInterval(() => {
        if (
          moment(timer, "HH:mm:ss").valueOf() ===
          moment(stop, "HH:mm:ss").valueOf()
        ) {
          this.setState(clearInterval(this.state.timerId));
          this.setState({
            pausResumeLabel: "Done",
            pauseResumeStyle: "btn btn-success w-100",
          });
          return 0;
        }
        timer = moment(timer, "HH:mm:ss")
          .subtract(1, "seconds")
          .format("HH:mm:ss");
        this.setState({ countdown: timer });
      }, 1000),
    });
  }

  componentWillUnmount() {
    this.setState(clearInterval(this.state.countdown));
  }

  pauseResumeTimer(e) {
    e.preventDefault();
    let stop = moment("000000", "HHmmss");
    stop = stop.format("HH:mm:ss");
    if (
      moment(this.state.countdown, "HH:mm:ss").valueOf() ===
      moment(stop, "HH:mm:ss").valueOf()
    ) {
      return;
    }
    if (this.state.isRunning) {
      this.setState(clearInterval(this.state.timerId));
      this.setState({
        pausResumeLabel: "Resume",
        pauseResumeStyle: "btn btn-outline-info w-100",
        isRunning: false,
      });
    } else {
      this.setState({
        pausResumeLabel: "Stop",
        pauseResumeStyle: "btn btn-outline-danger w-100",
        isRunning: true,
      });
      let timer = this.state.countdown;
      this.setState({
        timerId: setInterval(() => {
          if (
            moment(timer, "HH:mm:ss").valueOf() ===
            moment(stop, "HH:mm:ss").valueOf()
          ) {
            this.setState(clearInterval(this.state.timerId));
            this.setState({
              pausResumeLabel: "Done",
              pauseResumeStyle: "btn btn-success w-100",
            });
            return 0;
          }
          timer = moment(timer, "HH:mm:ss")
            .subtract(1, "seconds")
            .format("HH:mm:ss");
          this.setState({ countdown: timer });
        }, 1000),
      });
    }
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

  hadnleUnmount(e) {
    e.preventDefault();
    unmountComponentAtNode(document.getElementById("root"));
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
            <a href="#" className="text-dark" onClick={this.hadnleUnmount}>
              <FontAwesomeIcon icon={faTrash} />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className={this.state.pauseResumeStyle}
              onClick={this.pauseResumeTimer}
            >
              {this.state.pausResumeLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
