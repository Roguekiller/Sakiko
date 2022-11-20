const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    name: String,
    link: String,
    guild: String,
});

module.exports = {
    audioSchema: audioSchema
}