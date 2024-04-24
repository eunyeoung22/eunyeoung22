// @ts-check
const { test, expect } = require('@playwright/test');
import testData from '../playwright/.auth/user.json';

// 1. 만약 아래 줄에서 에러 날 시 node check-user-json.js 실행하여 .auth폴더와 user.json 체크 해보기
// 2. env에 자기 token 추가하기 또는 npx playwright test auth.setup.js 먼저 실행하여 user.json에 token 생성 확인 후, npx playwright test 실행
//const accessToken = testData ? testData.origins[0].localStorage[2].value : process.env.ACCESS_TOKEN;

// 정상 참여 케이스

test('event-join', async ({ page }) => {
  await page.goto(`${process.env.EVENT_URL}`);
  
  await page.getByLabel('동의함').check();
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByText('강일테니스장 5~').click();
  await page.locator('#part1002').click();
  await page.locator('#place1005').click();
  await page.locator('#td4').click();
  await page.getByLabel(':00~20:00').check();
  page.on('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: '코트일일이용신청' }).click();

  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('8');
  // page.once('dialog', dialog => {
  //   console.log(`Dialog message: ${dialog.message()}`);
  //   dialog.dismiss().catch(() => {});
  // });
  page.on('dialog', dialog => dialog.type());
  await page.getByRole('button', { name: '등록' }).click();
  
  
  //   await page.getByRole('button', { name: '등록' }).click();
  
  // await page.goto('https://online.igangdong.or.kr/rent/insert.do');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await expect(page.getByText('마이페이지').nth(4)).toBeVisible();   

})

  
  
  


