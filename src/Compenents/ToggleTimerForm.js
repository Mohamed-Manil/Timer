import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class ToggleTimerForm extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.projectInputRef = React.createRef();
    this.hoursInputRef = React.createRef();
    this.minutesInputRef = React.createRef();
    this.secondsInputRef = React.createRef();
    this.state = {
      warningTitle: "",
      warningProject: "",
      warningTimer: "",
      dissmisModal: "",
    };
    this.handleAddTimer = this.handleAddTimer.bind(this);
  }

  handleAddTimer(e) {
    e.preventDefault();
    this.setState({
      warningTitle: "",
      warningProject: "",
      warningTimer: "",
      dissmisModal: "",
    });
    if (this.titleInputRef.current.value === "") {
      this.setState({ warningTitle: "Title Fileld is Empty !!!" });
      return;
    }
    if (this.projectInputRef.current.value === "") {
      this.setState({ warningProject: "Project Fileld is Empty !!!" });
      return;
    }
    if (this.hoursInputRef.current.value === "") {
      this.setState({ warningTimer: "Hours Fileld is Empty !!!" });
      return;
    } else {
      if (this.minutesInputRef.current.value === "") {
        this.setState({ warningTimer: "Minutes Fileld is Empty !!!" });
        return;
      } else {
        if (this.secondsInputRef.current.value === "") {
          this.setState({ warningTimer: "Seconds Fileld is Empty !!!" });
          return;
        }
      }
    }
    this.setState({ dissmisModal: "modal" });
    this.props.onAdd(
      this.titleInputRef.current.value,
      this.projectInputRef.current.value,
      this.hoursInputRef.current.value,
      this.minutesInputRef.current.value,
      this.secondsInputRef.current.value
    );
  }
  render() {
    return (
      <div className="container">
        <button
          type="button"
          className="btn btn-info btn-lg rounded-circle"
          data-toggle="modal"
          data-target="#myModal"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Timer Form</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <form>
                    <div className="form-group">
                      <label htmlFor="formTitle">Title :</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formTitle"
                        placeholder="Enter Title"
                        ref={this.titleInputRef}
                      />
                      <small
                        id="formTitleHelper"
                        className="form-text text-danger"
                      >
                        {this.state.warningTitle}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="formProject">Project :</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formProject"
                        placeholder="Enter Project"
                        ref={this.projectInputRef}
                      />
                      <small
                        id="formProjectHelper"
                        className="form-text text-danger"
                      >
                        {this.state.warningProject}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="fomrTimer">Timer :</label>
                      <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="23"
                            id="hoursForm"
                            placeholder="Hours"
                            ref={this.hoursInputRef}
                          />
                        </div>
                        <div className="p-2 bd-highlight">
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="59"
                            id="minutesForm"
                            placeholder="Minutes"
                            ref={this.minutesInputRef}
                          />
                        </div>
                        <div className="p-2 bd-highlight">
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="59"
                            id="secondsForm"
                            placeholder="Seconds"
                            ref={this.secondsInputRef}
                          />
                        </div>
                      </div>
                      <small
                        id="fomrTimerHelper"
                        className="form-text text-danger"
                      >
                        {this.state.warningTimer}
                      </small>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer text-center">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-dismiss={this.state.dissmisModal}
                  onClick={this.handleAddTimer}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleTimerForm;
