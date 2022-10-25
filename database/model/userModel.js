const mongoose = require('mongoose');
const { userSchema } = require('../schema/userSchema');

async function generateUserModel() {
    const user = mongoose.model('User', userSchema);
    return user;
}

module.exports = {
    generateUserModel: generateUserModel
}