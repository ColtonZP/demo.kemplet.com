import React, { Component } from "react";
import PropTypes from "prop-types";

import { dateToday } from '../functions/kemplet-date';


import CalendarInput from "./CalendarInput";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todoLists: [],
      due: "",
      showingCalendar: false,
    };
  }

  updateTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  toggleCalendar = (arg) => {
    if (arg !== undefined) {
      this.setState({ showingCalendar: arg });
    } else {
      this.setState({ showingCalendar: !this.state.showingCalendar });
    }
  };

  updateDue = (e) => {
    this.setState({
      due: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, todoLists, due } = this.state;
    const { addTask, toggle } = this.props;
    if (title) {
      addTask({
        title,
        todoLists,
        due,
      });
      toggle();
    }
  };

  handleDue = (selected) => {
    this.setState({ due: selected });
  };

  render() {
    const { title, due } = this.state;
    const today = dateToday(0);
    const tomorrow = dateToday(1);

    return (
      <form className="addContainer">
        <div className="inputMotion">
          <input
            type="text"
            name="title"
            autoComplete="off"
            value={title}
            onChange={this.updateTitle}
            required
          />
          <span>Title</span>
        </div>

        <div className="inputMotion">
          <input
            type="text"
            name="due"
            className="dateInput"
            autoComplete="off"
            value={due}
            required
            onFocus={() => this.toggleCalendar(true)}
          />
          <span>Due</span>
        </div>
        <CalendarInput
          showing={this.state.showingCalendar}
          handleDue={this.handleDue}
          toggle={this.toggleCalendar}
        />
        <div className="dueOptions">
          <input
            className="active"
            type="button"
            value="none"
            onClick={() => {
              this.handleDue("");
              this.toggleCalendar(false);
            }}
          />
          <input
            type="button"
            value="today"
            onClick={() => {
              this.handleDue(today);
              this.toggleCalendar(false);
            }}
          />
          <input
            type="button"
            value="tomorrow"
            onClick={() => {
              this.handleDue(tomorrow);
              this.toggleCalendar(false);
            }}
          />
        </div>
        <input
          className="addSubmit"
          type="submit"
          value="add"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

Add.propTypes = {
  addTask: PropTypes.func,
  toggle: PropTypes.func,
};

export default Add;
