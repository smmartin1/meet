import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleInputChanged = (event) => {
    let value = event.target.value;
    if (value >= 0 && value <= 32) {
      this.setState({ numberOfEvents: value });
    } else {
      console.log('Enter a number between 1 and 32');
    }
    this.props.updateEvents(value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label>Number of Events</label>
        <input
          type="number"
          className="events"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    )
  }
}

export default NumberOfEvents;
