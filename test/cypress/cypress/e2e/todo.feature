Feature: ToDo List Management

  Background:
    Given I am on the ToDo List homepage

  Scenario: Add a new task
    When I enter "Aleargă" in the input field
    And I click the "Adaugă" button
    Then I should see "Aleargă" in the task list

  Scenario: Mark a task as completed
    Given I have added a task "Aleargă"
    When I check the checkbox for "Aleargă"
    Then "Aleargă" should be marked as completed

  Scenario: Filter tasks by active
    Given I have added tasks "Aleargă" and "Bea apă"
    And I have marked "Aleargă" as completed
    When I click the "Active" filter
    Then I should only see "Bea apă" in the task list

  Scenario: Filter tasks by completed
    Given I have added tasks "Aleargă" and "Bea apă"
    And I have marked "Aleargă" as completed
    When I click the "Finalizate" filter
    Then I should only see "Aleargă" in the task list

  Scenario: Edit a task
    Given I have added a task "Aleargă"
    When I click the edit button for "Aleargă"
    And I change the task text to "Mergi"
    And I save the changes
    Then I should see "Mergi" in the task list

  Scenario: Delete a task
    Given I have added a task "Aleargă"
    When I click the delete button for "Aleargă"
    And I confirm the deletion
    Then I should not see "Aleargă" in the task list