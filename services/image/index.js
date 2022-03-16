import puppeteer from 'puppeteer';
import { makeScreenshot } from 'services/image/screenshot';

export const generateImage = async () => {
  let browserInstance;
  try {
    const browserInstance = await newInstance();
    const page = await browserInstance.newPage();

    const image = await takeScreenshot(
      page,
      {
        width: 512,
        height: 512,
        deviceScaleFactor: 1,
      },
      `http://${process.env.APP_URL}/image/example`
    );

    await closeInstance(browserInstance);

    return image;
  } catch (error) {
    console.log(error);
    if (browserInstance) {
      await closeInstance(browserInstance);
    }
  }
  return null;
};

const takeScreenshot = async (page, viewport, url) => {
  await page.setViewport(viewport);

  if (!url) {
    throw Error('You must provide an html or url property.');
  }

  const buffer = await makeScreenshot(page, {
    transparent: false,
    url,
    // @ts-ignore
    waitUntil: process.env.PUPPETEER_WAITFOR || 'networkidle0',
  });

  return buffer;
};

let chromium;

const newInstance = async () => {
  if (!chromium) {
    try {
      chromium = require('chrome-aws-lambda');
    } catch (error) {
      throw new Error('chromium failed to load');
    }
  }
  return await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

const closeInstance = async browser => {
  return await browser.close();
};
