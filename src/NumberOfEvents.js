import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    infoText: ''
  };

  handleInputChanged = (event) => {
    let value = parseInt(event.target.value);
    if (value <= 0 || value > 32) {
      this.setState({
        infoText: 'Enter a number between 1 and 32'
      });

      console.log('Enter a number between 1 and 32');
    } else {
      this.props.updateEvents(undefined, value);
      this.setState({
        infoText: ''
      });
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

        <ErrorAlert text={this.state.infoText} />
      </div>
    )
  }
}

export default NumberOfEvents;
