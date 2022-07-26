import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('show 32 events by default', async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    const numberEvents = AppWrapper.state('eventsLength');
    expect(AppWrapper.state('events')).toEqual(allEvents.slice(0, numberEvents));
    AppWrapper.unmount();
  });

  test('update the number of events showing', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const numberEvents = 4;
    await NumberOfEventsWrapper.instance().handleInputChanged({
      target: { value: numberEvents }
    });
    const eventsDisplay = mockData.slice(0, numberEvents);
    AppWrapper.setState({ events: eventsDisplay });
    expect(AppWrapper.state('events')).toEqual(eventsDisplay);
    expect(AppWrapper.state('events')).toHaveLength(numberEvents);
    AppWrapper.unmount();
  });

  test('update both the number of events and city search', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const numberEvents = 3;
    await NumberOfEventsWrapper.instance().handleInputChanged({
      target: { value: numberEvents }
    });
    const city = 'London, UK';
    await CitySearchWrapper.instance().handleItemClicked(city);
    const eventsDisplay = mockData
      .filter((e) => e.location === city)
      .slice(0, numberEvents);
    AppWrapper.setState({ events: eventsDisplay });
    expect(AppWrapper.state('events')).toEqual(eventsDisplay);
    expect(AppWrapper.state('events')).toHaveLength(numberEvents);
    AppWrapper.unmount();
  });
});
