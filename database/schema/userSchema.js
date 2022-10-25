const mongoose = require('mongoose');
const { profileSchema } = require('./profileSchema');

const userSchema = new mongoose.Schema({
    discordId: Number,
    userName: String,
    socials: {type: profileSchema, default: () => ({})},
});

module.exports = {
    userSchema: userSchema
}