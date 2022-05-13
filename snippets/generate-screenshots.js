const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = path.join(__dirname, 'index.html');

    page
        .on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
        .on('pageerror', ({ message }) => console.log(message))
        .on('response', response => console.log(`${response.status()} ${response.url()}`))
        .on('requestfailed', request => console.log(`${request.failure().errorText} ${request.url()}`))

    await page.setViewport({
        width: 640,
        height: 480,
        deviceScaleFactor: 1,
    });

    await page.goto(`file:${filePath}`);

    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();
