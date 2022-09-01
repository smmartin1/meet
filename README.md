# meet
An app where users can find events happening around the world. This app uses React and Test-Driven Development.

SHOW/HIDE AN EVENT'S DETAILS
  As a user, I should be able to view details of a certain event and hide details when looking for a different event.

  Scenario 1: An event element is collapsed by default
    Given: User is on the main page
    When: User has not selected anything
    Then: An event will not show its details

  Scenario 2: User can expand an event to see its details
    Given: User wants to see more information of an event
    When: User selects the event of interest
    Then: Event details will be shown

  Scenario 3: User can collapse an event to hide its details
    Given: User wants to hide details
    When: User clicks out of the extended event's details
    Then: The event's details will be hidden

SPECIFY NUMBER OF EVENTS
  As a user, I should be able to see a certain number of upcoming events.

  Scenario 1: When user hasn’t specified a number, 32 is the default number
    Given: User has not set a number of events to see
    When: User is on the app
    Then: 32 events will be displayed

  Scenario 2: User can change the number of events they want to see
    Given: User wants to see more or less events on the page
    When: User visits the page
    Then: The number of events user wants to see is displayed

USE THE APP WHEN OFFLINE
  As a user, I should be able to use the app when offline.

  Scenario 1: Show cached data when there’s no internet connection
    Given: User has no internet
    When: User is on the app
    Then: Data is still accessible and viewable

  Scenario 2: Show error when user changes the settings (city, time range)
    Given: User has no internet
    When: User wants to change the settings
    Then: An error will be displayed

DATA VISUALIZATION
  As a user, I would like to see a chart of upcoming events in my city.

  Scenario 1: Show a chart with the number of upcoming events in each city
    Given: User opens the app
    When: User wants to look for events
    Then: User will see a chart of upcoming events
