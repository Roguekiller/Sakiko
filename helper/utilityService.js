// Parsing mentions if used inside of a string option arguement.
function parseMentions(mentions) {
    if(!mentions) return;
    return mentions.match(/\d+/g);
}

// Returns a random number from 0 - x where x is the max input.
function randomGenerator(max) {
    return (Math.floor(Math.random() * max));
}

// Build a string by iterating over an array and appending it's elements.
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