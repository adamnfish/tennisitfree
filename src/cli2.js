const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');
const utils = require('./utils');


const date = utils.resolveDate(process.argv[2], new Date());
const dateStr = utils.formatDate(date);
const dayName = date.toLocaleDateString("en-GB", { weekday: 'long' });
console.log("Checking courts for date:", dayName, dateStr);


(async () => {
    const url = 'https://www.openplay.co.uk/booking/place/160?date=' + dateStr + '&use_id=42'
    const response = await fetch(url);
    const text = await response.text();
    const dom = await new JSDOM(text);
    const availableSlotEls = [].slice.call(
        dom.window.document.querySelectorAll('table.table-resource td:not(.slot-6051):not(.slot-6050) a[data-title="Select pricing"]')
    );
    const contents = availableSlotEls.map((el) => el.textContent);
    const result = utils.formatResult(contents);
    console.log(result);
    console.log(url);
})();
