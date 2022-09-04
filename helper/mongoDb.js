const mongoose = require('mongoose');
const { mongoURI } = require('../config.json');

// Connect to local database.
async function connectDatabase() {
    try {
        await mongoose.connect(mongoURI) ?
        console.log('Connected to Database') : console.log('Not Connected to Database');
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    connectDatabase: connectDatabase
}