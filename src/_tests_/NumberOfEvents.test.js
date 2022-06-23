import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.events')).toHaveLength(1);
  });

  test('render default number of 32', () => {
    expect(NumberOfEventsWrapper.find('.events').get(0).props.value).toEqual(32);
  });

  test('change number of events', () => {
    NumberOfEventsWrapper.find('.events').simulate('change', {
      target: { value: 18 }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(18);
  });

  test('allow number of events to be more than 0', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.events').simulate('change', {
      target: { value: -1 }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });

  test('allow numbers only', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.events').simulate('change', {
      target: { value: 'hello' }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });
})
