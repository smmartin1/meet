import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-events')).toHaveLength(1);
  });

  test('render default number of 32', () => {
    expect(NumberOfEventsWrapper.find('.number-events').prop('value')).toEqual(32);
  });

  test('change number of events', () => {
    NumberOfEventsWrapper.find('.number-events').simulate('change', {
      target: { value: 18 }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(18);
  });

  test('allow number of events to be more than 0', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number-events').simulate('change', {
      target: { value: -1 }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });

  test('allow number of events to be less than 32', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number-events).simulate('change', {
      target: { value: 37 }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });

  test('allow numbers only', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number-events').simulate('change', {
      target: { value: 'hello' }
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });
})
