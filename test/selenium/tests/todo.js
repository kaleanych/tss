const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('ToDo List Management', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000');
    });

    after(async function () {
        await driver.quit();
    });

    it('should add a new task', async function () {
        const input = await driver.findElement(By.id('todo-input'));
        await input.sendKeys('Aleargă');
        const addButton = await driver.findElement(By.css('button[type="submit"]'));
        await addButton.click();
        const todoList = await driver.findElement(By.id('todo-list'));
        const text = await todoList.getText();
        assert(text.includes('Aleargă'));
    });

    it('should mark a task as completed', async function () {
        const checkbox = await driver.findElement(By.xpath('//div[contains(@class, "todo-item") and contains(., "Aleargă")]//div[contains(@class, "checkbox")]'));
        await checkbox.click();
        const completedTask = await driver.findElement(By.css('.todo-item.completed'));
        assert(await completedTask.getText() === 'Aleargă');
    });

    it('should filter tasks by active', async function () {
        const input = await driver.findElement(By.id('todo-input'));
        await input.sendKeys('Bea apă');
        await driver.findElement(By.css('button[type="submit"]')).click();
        const activeFilter = await driver.findElement(By.css('a[data-filter="active"]'));
        await activeFilter.click();
        const tasks = await driver.findElements(By.css('#todo-list .todo-item .task-name'));
        const taskTexts = await Promise.all(tasks.map(task => task.getText()));
        assert.deepStrictEqual(taskTexts, ['Bea apă']);
    });

    it('should filter tasks by completed', async function () {
        const completedFilter = await driver.findElement(By.css('a[data-filter="completed"]'));
        await completedFilter.click();
        const tasks = await driver.findElements(By.css('#todo-list .todo-item .task-name'));
        const taskTexts = await Promise.all(tasks.map(task => task.getText()));
        assert.deepStrictEqual(taskTexts, ['Aleargă']);
    });

    it('should edit a task', async function () {
        const editButton = await driver.findElement(By.xpath('//div[contains(@class, "todo-item") and contains(., "Aleargă")]//button[contains(@class, "edit-btn")]'));
        await editButton.click();
        const editInput = await driver.findElement(By.id('edit-input'));
        await editInput.clear();
        await editInput.sendKeys('Mergi');
        const saveButton = await driver.findElement(By.id('save-edit'));
        await saveButton.click();
        const todoList = await driver.findElement(By.id('todo-list'));
        const text = await todoList.getText();
        assert(text.includes('Mergi'));
    });

    it('should delete a task', async function () {
        const deleteButton = await driver.findElement(By.xpath('//div[contains(@class, "todo-item") and contains(., "Mergi")]//button[contains(@class, "delete-btn")]'));
        await deleteButton.click();
        const confirmButton = await driver.findElement(By.css('#delete-modal .ok.button'));
        await confirmButton.click();
        const todoList = await driver.findElement(By.id('todo-list'));
        const text = await todoList.getText();
        assert(!text.includes('Mergi'));
    });
});
