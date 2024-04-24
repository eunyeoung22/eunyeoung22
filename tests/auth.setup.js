import { test as setup , expect } from '@playwright/test';

const authFile = './playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto(`${process.env.LOGIN_URL}`);
    await page.locator('#member_id').click();
    await page.locator('#member_id').fill(`${process.env.GANGIL_ID}`);
    await page.locator('#member_pw').click();
    await page.locator('#member_pw').fill(`${process.env.GANGIL_PW}`);
    await page.getByRole('button', { name: '로그인' }).click();

    
    await page.context().storageState({ path: authFile });
});