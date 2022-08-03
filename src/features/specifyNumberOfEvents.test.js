import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn\’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;

    given('user has not set a number of events to see', () => {});

    when('user is on the app', () => {
      AppWrapper = mount(<App />);
    });

    then('32 events will be displayed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(10);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;

    given('user wants to see more or less events on the page', async () => {
      AppWrapper = await mount(<App />);
    });

    when('user visits the page', () => {
      AppWrapper.update();
      AppWrapper.find('.events').simulate('change', { target: 5 });
    });

    then('the number of events user wants to see is displayed', () => {
      expect(AppWrapper.find('.EventList')).toHaveLength(5);
    });
  });
});
