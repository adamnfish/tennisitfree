const playwright = require('playwright');
const { resolveDate, formatDate, formatResult } = require('./utils');


const date = resolveDate(process.argv[2], new Date());
const dateStr = formatDate(date);
const dayName = date.toLocaleDateString("en-GB", { weekday: 'long' });
console.log("Checking courts for date:", dayName, dateStr);


(async () => {
    const url = 'https://www.openplay.co.uk/booking/place/160?date=' + dateStr + '&use_id=42';

    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);
    const available = await page.$$('css=table.table-resource td:not(.slot-6051):not(.slot-6050) a[data-title="Select pricing"]');
    const contents = await Promise.all(available.map(function(elH){
        return elH.innerText();
    }));


    result = formatResult(contents);
    console.log(result);
    console.log(url);

    await browser.close();
})();
