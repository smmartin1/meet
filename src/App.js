import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations } from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      numberOfEvents: 32,
      selectedLocation: 'all',
      offlineText: ''
    }
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  /*
  if (!navigator.onLine) {
    this.setState({
      offlineText: 'You are currently offline. Events are loaded through cache.'
    });
  }
  */

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else {
      this.setState({ numberOfEvents: eventCount });
    }

    if (location === undefined) {
      location = this.state.selectedLocation;
    }

    getEvents().then((events) => {
      let locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
        selectedLocation: location
      });
    });
  }

  render() {
    return (
      <div className="App">
        {!navigator.onLine && <OfflineAlert text={"You are currently offline. Events are loaded through cache."} />}
        <h1>Meet</h1>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
