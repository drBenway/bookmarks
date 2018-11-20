Feature: have an overview page

  As a user
  I want to have an overview page
  So I can structure my bookmarks


  Scenario: spinning up the app and visiting localhost:3000 should give the overview page
    Given I have an open browser
    And I go to localhost:3000
    Then I should see a webpage with title Bookmarks

  Scenario: The app should have an option to add a new bookmark
    Given I have an open browser
    And I go to localhost:3000
    Then I should have a button to add bookmarks


