export const makeScreenshot = async function (
  page,
  {
    output,
    quality,
    encoding,
    url,
    transparent = false,
    waitUntil = 'networkidle0',
  }
) {
  let screeshotArgs = {};

  const type = 'jpeg';
  screeshotArgs.quality = quality ? quality : 100;

  await page.goto(url, { waitUntil });

  const buffer = await page.screenshot({
    path: output,
    type,
    omitBackground: transparent,
    encoding,
    ...screeshotArgs,
  });

  return buffer;
};
