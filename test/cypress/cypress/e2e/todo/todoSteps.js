import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps';

const { homeURL } = Cypress.env();

Given('I am on the ToDo List homepage', () => {
    cy.visit(homeURL);
});

When('I enter {string} in the input field', (task) => {
    cy.fixture('task').then((taskData) => {
        cy.get('#todo-input').type(taskData.name);
    });
});

And('I click the {string} button', (buttonText) => {
    cy.contains('button', buttonText).click();
});

Then('I should see {string} in the task list', (task) => {
    cy.get('#todo-list').should('contain', task);
});

Given('I have added a task {string}', (task) => {
    cy.get('#todo-input').type(task);
    cy.get('button[type="submit"]').click();
});

When('I check the checkbox for {string}', (task) => {
    cy.contains('.todo-item', task).find('input[type="checkbox"]').check({ force: true });
});

Then('{string} should be marked as completed', (task) => {
    cy.contains('.todo-item.completed', task).should('exist');
});

Given('I have added tasks {string} and {string}', (task1, task2) => {
    cy.get('#todo-input').type(task1);
    cy.get('button[type="submit"]').click();
    cy.get('#todo-input').type(task2);
    cy.get('button[type="submit"]').click();
});

And('I have marked {string} as completed', (task) => {
    cy.contains('.todo-item', task)
        .find('input[type="checkbox"]')
        .check({ force: true });
});

When('I click the {string} filter', (filter) => {
    cy.contains(filter).click();
});

Then('I should only see {string} in the task list', (task) => {
    cy.get('#todo-list').children().should('have.length', 1).and('contain', task);
});

When('I click the edit button for {string}', (task) => {
    cy.contains('.todo-item', task).find('.edit-btn').click();
});

When('I change the task text to {string}', (newTask) => {
    cy.get('#edit-input').clear();
    cy.get('#edit-input').type(newTask);
});

When('I save the changes', () => {
    cy.get('#save-edit').click();
});

When('I click the delete button for {string}', (task) => {
    cy.contains('.todo-item', task).find('.delete-btn').click();
});

When('I confirm the deletion', () => {
    cy.get('#delete-modal .ok.button').click();
});

Then('I should not see {string} in the task list', (task) => {
    cy.get('#todo-list').should('not.contain', task);
});