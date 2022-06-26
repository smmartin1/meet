import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 0 && value <= 32) {
      this.setState({ numberOfEvents: value });
    } else {
      console.log('Enter a number between 1 and 32');
    }
  };

  render() {
    return (
      <div className="CitySearch">
        <label>Number of Events</label>
        <input
          type="text"
          className="events"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;
