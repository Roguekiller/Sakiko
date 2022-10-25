const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    twitter: { type: String, default: null},
    twitch: { type: String, default: null},
    myAnimeList: { type: String, default: null},
    tiktok: { type: String, default: null},
    youtube: { type: String, default: null},
});

module.exports = {
    profileSchema: profileSchema
}