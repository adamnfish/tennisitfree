const playwright = require('playwright');
const utils = require('./utils');


let date = new Date();
const dateArg = process.argv[2] || 'today';
if (dateArg.toLowerCase().startsWith('tod')) {
    // all good
} else if (dateArg.toLowerCase().startsWith('tom')) {
    date.setDate(date.getDate() + 1);
} else if (dateArg.startsWith('+')) {
    const count = parseInt(dateArg.substr(1), 10);
    date.setDate(date.getDate() + count);
}
const dateStr = utils.formatDate(date);
console.log("Checking courts for date:", dateStr);


(async () => {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();

    await checkDay(dateStr, context);

    await browser.close();
})();


async function checkDay(date, context) {
    const page = await context.newPage();
    await page.goto('https://www.openplay.co.uk/booking/place/160?date=' + date + '&use_id=42');
    const available = await page.$$('css=table.table-resource td:not(.slot-6051):not(.slot-6050) a[data-title="Select pricing"]');
    const contents = await Promise.all(available.map(function(elH){
        return elH.innerText();
    }));
    const counted = utils.groupCount(contents);
    counted.sort((el1, el2) => {
        el1[1].localeCompare(el2[1]);
    });
    if (counted.length == 0) {
        console.log("No courts available");
    } else {
        counted.forEach((elCount) => {
            console.log(elCount[1], elCount[0] + " available");
        });
    }
    return contents;
}
