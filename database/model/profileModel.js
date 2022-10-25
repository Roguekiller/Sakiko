const mongoose = require('mongoose');
const { profileSchema } = require('../schema/profileSchema');

async function generateProfileModel() {
    const userProfile = mongoose.model('Profile', profileSchema);
    return userProfile;
}

module.exports = {
    generateProfileModel: generateProfileModel,
}