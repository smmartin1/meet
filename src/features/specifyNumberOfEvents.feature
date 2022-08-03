Feature: Specify a number of events

Scenario: When user hasn’t specified a number, 32 is the default number
  Given user has not set a number of events to see
  When user is on the app
  Then 32 events will be displayed

Scenario: User can change the number of events they want to see
  Given user wants to see more or less events on the page
  When user visits the page
  Then the number of events user wants to see is displayed
