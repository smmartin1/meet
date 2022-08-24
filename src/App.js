import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations, /*checkToken,*/ getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      locations: [],
      //showWelcomeScreen: undefined,
      numberOfEvents: 32,
      selectedLocation: 'all',
      offlineText: ''
    }
  }

  componentDidMount(){
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  /*
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({
      showWelcomeScreen: !(code || isTokenValid)
    });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    //if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        {!navigator.onLine &&
          <OfflineAlert
            text={"You are currently offline. Events are loaded through cache and may not be up to date."}
          />
        }

        <h1>Meet</h1>

        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />

        <h4>Events in each city</h4>

        <ResponsiveContainer height={400} >
         <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
           <CartesianGrid />
           <XAxis type="category" dataKey="city" name="city" />
           <YAxis
             allowDecimals={false}
             type="number"
             dataKey="number"
             name="number of events"
           />
           <Tooltip cursor={{ strokeDasharray: "3 3" }} />
           <Scatter data={this.getData()} fill="#8884d8" />
         </ScatterChart>
       </ResponsiveContainer>

        <EventList events={this.state.events} />

        /*
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }}
        />
        */
      </div>
    );
  }
}

export default App;
