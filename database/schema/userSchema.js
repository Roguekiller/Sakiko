const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: Number,
    userName: String,
});

module.exports = {
    userSchema: userSchema
}