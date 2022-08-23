
function parseMentions(mentions) {
    if(!mentions) return;
    return mentions.match(/\d+/g);
}

function randomGenerator(max) {
    return (Math.floor(Math.random() * max));
}

function arrayToString(array) { 
    let string = '';
    array.forEach(element => {
        string += element + " " + '\n';
    });

    return string;
}

module.exports = {
    parseMentions: parseMentions,
    arrayToString: arrayToString,
    randomGenerator: randomGenerator,
}