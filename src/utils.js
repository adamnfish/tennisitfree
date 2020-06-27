function groupCount(as) {
    const answer = as.reduce(function(acc, a){
        if (acc.some((entry) => entry[1] == a)) {
            return acc.map(function(entry){
                if (entry[1] == a) {
                    return [entry[0] + 1, entry[1]];
                } else {
                    return entry;
                }
            });
        } else {
            return acc.concat([[1, a]]);
        }
    }, []);
    return answer;
}

function formatDate(date) {
    const month = date.getMonth() + 1;
    return date.getFullYear() + "-" + (String("00" + month).slice(-2)) + "-" + date.getDate();
}

function resolveDate(rawDateArg, today) {
    let date = new Date(today);
    const dateArg = rawDateArg || 'today';
    if (dateArg.toLowerCase().startsWith('tod')) {
        // all good
    } else if (dateArg.toLowerCase().startsWith('tom')) {
        date.setDate(date.getDate() + 1);
    } else if (dateArg.startsWith('+')) {
        const count = parseInt(dateArg.substr(1), 10);
        date.setDate(date.getDate() + count);
    }
    return date;
}

function formatResult(contents) {
    let result = "";
    const counted = groupCount(contents);
    counted.sort((el1, el2) => {
        el1[1].localeCompare(el2[1]);
    });
    if (counted.length == 0) {
        result = "No courts available";
    } else {
        counted.forEach((elCount) => {
            result = result + elCount[1] + " " + elCount[0] + " available\n";
        });
    }
    return result;
}

module.exports = {groupCount, formatDate, resolveDate, formatResult};
