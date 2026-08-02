import { test, expect } from '@playwright/test';

test('Open modal and spoilerland', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Go to page 14' }).click();
    await page.getByRole('link', { name: 'Frida and Mia are facing each' }).click();
    await page.getByText('Enter spoilerland (click here').click();
    await page.getByText('Is there cheating on a third').click();
    await expect(page.locator('body')).toContainText('Is there cheating on a third party Yes');
});