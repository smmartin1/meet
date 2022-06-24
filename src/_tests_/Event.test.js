import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('renders event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('renders title of event', () => {
    expect(EventWrapper.find('.event-name')).toHaveLength(1);
  });

  test('renders date of event', () => {
    expect(EventWrapper.find('.event-date')).toHaveLength(1);
  });

  test('render location of event', () => {
    expect(EventWrapper.find('.event-location')).toHaveLength(1);
  });

  test('render button that displays details', () => {
    expect(EventWrapper.find('.event-button')).toHaveLength(1);
  });

  test('show details', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.event-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('hide details', () => {
    EventWrapper.setState({
      collapsed: false
    });
    EventWrapper.find('.event-button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
  });
})
