import React, { Component } from "react";

class EditableTimer extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = React.createRef();
    this.projectInputRef = React.createRef();
    this.state = {
      warningTitle: "",
      warningProject: "",
    };
    this.updateInfoTimer = this.updateInfoTimer.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
  }
  updateInfoTimer(e) {
    e.preventDefault();
    this.setState({ warningTitle: "", warningProject: "" });
    if (this.titleInputRef.current.value === "") {
      this.setState({ warningTitle: "Title Fileld is Empty !!!" });
      return;
    }
    if (this.projectInputRef.current.value === "") {
      this.setState({ warningProject: "Project Fileld is Empty !!!" });
      return;
    }
    this.props.onUpdate(
      this.titleInputRef.current.value,
      this.projectInputRef.current.value
    );
  }
  cancelUpdate(e) {
    e.preventDefault();
    this.props.onCancel();
  }
  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Title"
              ref={this.titleInputRef}
            />
            <small id="titlehelper" className="form-text text-danger">
              {this.state.warningTitle}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input
              type="text"
              className="form-control"
              id="project"
              placeholder="Enter Project"
              ref={this.projectInputRef}
            />
            <small id="projecthelper" className="form-text text-danger">
              {this.state.warningProject}
            </small>
          </div>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-outline-primary w-100"
                onClick={this.updateInfoTimer}
              >
                Update
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-danger w-100"
                onClick={this.cancelUpdate}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditableTimer;
