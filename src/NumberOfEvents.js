import React, { Component } from 'react';

class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    let value = parseInt(event.target.value);
    if (value <= 0 || value > 32) {
      console.log('Enter a number between 1 and 32');
    } else {
      this.props.updateEvents(undefined, value);
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label>Number of Events</label>
        <input
          type="number"
          className="events"
          value={this.props.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;
