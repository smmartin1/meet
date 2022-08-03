import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user is on the main page', () => {});

    when('user has not selected anything', () => {
      AppWrapper = mount(<App />);
    });

    then('an event will not show its details', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .event-description')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('user wants to see more information of an event', () => {
      AppWrapper = mount(<App />);
    });

    when('user selects the event of interest', () => {
      AppWrapper.update();
      AppWrapper.find('.event .event-button').at(0).simulate('click');
    });

    then('event details will be shown', () => {
      expect(AppWrapper.find('.event .event-description')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('user wants to hide details', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .event-button').at(0).simulate('click');
    });

    when('user clicks out of the extended event\'s details', () => {
      AppWrapper.update();
      AppWrapper.find('.event .event-button').at(0).simulate('click');
    });

    then('the event\'s details will be hidden', () => {
      expect(AppWrapper.find('.event .event-description')).toHaveLength(0);
    });
  });
});
