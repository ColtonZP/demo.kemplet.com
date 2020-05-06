import React, { Component } from 'react';

export default class DayNight extends Component {
  constructor() {
    super();
    this.state = {
      startHour: 9,
      endHour: 9,
      time: '',
    };
  }

  componentDidMount() {
    this.update = setInterval(() => {
      this.setState({ time: this.getTime() });
    }, 1000);
  }

  getTime() {
    const { startHour, endHour } = this.state;
    const minute = new Date().getMinutes();
    const hour = new Date().getHours();
    const time = hour + minute / 60;
    const activeHours = endHour + 12 - startHour;
    const completionTime = Math.round(((time - startHour) / activeHours) * 100);
    if (completionTime >= 100 || completionTime <= 0) {
      return (
        <span role="img" aria-label="sleep" className="dayNight">
          💤
        </span>
      );
    }
    return <span className="dayNight">{completionTime}</span>;
  }

  render() {
    const { time } = this.state;
    return time;
  }
}
