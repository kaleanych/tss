const {test, expect} = require('@playwright/test');

test.describe('ToDo List Management', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:3000');
    });

    test('should add a new task', async ({page}) => {
        await page.fill('#todo-input', 'Aleargă');
        await page.click('button:has-text("Adaugă")');
        await expect(page.locator('#todo-list')).toContainText('Aleargă');
    });

    test('should mark a task as completed', async ({page}) => {
        await page.fill('#todo-input', 'Aleargă');
        await page.click('button:has-text("Adaugă")');
        await page.locator('.todo-item:has-text("Aleargă") input[type="checkbox"]').check({force: true});
        await expect(page.locator('.todo-item.completed:has-text("Aleargă")')).toBeVisible();
    });

    test('should filter tasks by active', async ({page}) => {
        await page.fill('#todo-input', 'Aleargă');
        await page.click('button:has-text("Adaugă")');
        await page.fill('#todo-input', 'Bea apă');
        await page.click('button:has-text("Adaugă")');
        await page.locator('.todo-item:has-text("Aleargă") input[type="checkbox"]').check({force: true});
        await page.click('a:has-text("Active")');
        const tasks = await page.locator('#todo-list .todo-item .task-name').allInnerTexts();
        expect(tasks).toEqual(['Bea apă']);
    });

    test('should filter tasks by completed', async ({page}) => {
        await page.fill('#todo-input', 'Aleargă');
        await page.click('button:has-text("Adaugă")');
        await page.fill('#todo-input', 'Bea apă');
        await page.click('button:has-text("Adaugă")');
        await page.locator('.todo-item:has-text("Aleargă") input[type="checkbox"]').check({force: true});
        await page.click('a:has-text("Finalizate")');
        const tasks = await page.locator('#todo-list .todo-item .task-name').allInnerTexts();
        expect(tasks).toEqual(['Aleargă']);
    });

    test('should edit a task', async ({page}) => {
        await page.fill('#todo-input', 'Aleargă');
        await page.click('button:has-text("Adaugă")');
        await page.locator('.todo-item:has-text("Aleargă") .edit-btn').click();
        await page.fill('#edit-input', 'Mergi');
        await page.click('#save-edit');
        await expect(page.locator('#todo-list')).toContainText('Mergi');
    });

    test('should delete a task', async ({page}) => {
        await page.fill('#todo-input', 'Aleargă');
        await page.click('button:has-text("Adaugă")');
        await page.locator('.todo-item:has-text("Aleargă") .delete-btn').click();
        await page.click('#delete-modal .ok.button');
        await expect(page.locator('#todo-list')).not.toContainText('Aleargă');
    });
});
