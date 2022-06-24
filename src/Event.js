import React, { Component } from "react";

class Event extends Component {
  state = {
    collapsed: true,
  }

  handleClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  dateFormat = (dateOfEvent) => {
    const eventDate = `${new Date(dateOfEvent)}`;
    return eventDate;
  };

  render() {
    const { event } = this.props

    return (
      <div className="event">
        <h2 className="event-name">{event.summary}</h2>
        <p className="event-date">Date: {this.dateFormat(event.start.dateTime)}</p>
        <p className="event-location">Location: {event.location}</p>
        {!this.state.collapsed && (
          <p className="event-description">Description: {event.description}</p>
        )}
        <button className="event-button" onClick={this.handleClick}>Details</button>
      </div>
    )
  }
}
export default Event;
