const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    name: String,
    fileName: String,
    url: String,
});

module.exports = {
    audioSchema: audioSchema
}