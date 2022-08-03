Feature: Show and hide an event's details

Scenario: An event element is collapsed by default
  Given user is on the main page
  When user has not selected anything
  Then an event will not show its details

Scenario: User can expand an event to see its details
  Given user wants to see more information of an event
  When user selects the event of interest
  Then event details will be shown

Scenario: User can collapse an event to hide its details
  Given user wants to hide details
  When user clicks out of the extended event's details
  Then the event's details will be hidden
