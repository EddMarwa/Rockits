const puppeteer = require('puppeteer');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/en/about'
];

(async () => {
  try {
    const launchArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process', '--no-zygote'];
    const launchOpts = { headless: true, args: launchArgs, timeout: 30000 };
    // Allow overriding the Chrome executable path via env var CHROME_PATH
    if (process.env.CHROME_PATH) launchOpts.executablePath = process.env.CHROME_PATH;
    const browser = await puppeteer.launch(launchOpts);
    const page = await browser.newPage();
    const results = [];

    for (const url of urls) {
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
        // Wait a short while for client components to hydrate / lazy-load
        await page.waitForTimeout(1500);

        const containerExists = await page.$('#particles-container') !== null;
        const tspExists = await page.$('#tsparticles') !== null;

        const computed = await page.evaluate(() => {
          const container = document.querySelector('#particles-container');
          const content = document.querySelector('.relative.z-10') || document.querySelector('main') || document.body;
          const containerStyle = container ? window.getComputedStyle(container) : null;
          const contentStyle = content ? window.getComputedStyle(content) : null;
          return {
            containerZ: containerStyle ? containerStyle.zIndex : null,
            containerDisplay: containerStyle ? containerStyle.display : null,
            contentZ: contentStyle ? contentStyle.zIndex : null
          };
        });

        results.push({ url, containerExists, tspExists, computed });
      } catch (err) {
        results.push({ url, error: String(err) });
      }
    }

    console.log(JSON.stringify(results, null, 2));
    await browser.close();

    // exit with non-zero if any page failed or no tsparticles
    const failed = results.some(r => r.error || !r.containerExists || !r.tspExists);
    process.exit(failed ? 2 : 0);
  } catch (err) {
    console.error('Headless check failed:', err);
    process.exit(3);
  }
})();
