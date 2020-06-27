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

module.exports = {groupCount, formatDate};
