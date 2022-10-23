//Service file for handling user interactions
const mongoose = require('mongoose');
const { userSchema } = require('../schema/userSchema');
const { generateUserModel } = require('../model/userModel');
const { sendEphemeralReply } = require('../../helper/channelService');

// Async function for creating the specified user in the database.
async function createUser(message, userId, userName, userModel) {
    try {
        const dbUser = new userModel({discordId: userId, userName: userName});
        console.log('Generating user |' + userName + '| in the database.');
        
        dbUser.save();
        
        console.log('Saved user |' + userName + '| in the database.');
        sendEphemeralReply(message, `You're registered! Thank you!`);
    } catch(error) {
        sendEphemeralReply(message, 'Check with Senpai. There was an error registering you.');
        console.log('Error creating user: ' + error);
    }
}

// Async function for finding the user in the documents of the database.
async function findUser(message, userName, userModel) {
    try {
        console.log('Searching for user |' + userName + '| in the database!');
        const dbUser = await userModel.findOne({ userName: userName }).exec();
        if(dbUser !== null) {
            console.log('Found user |' + userName + '| in the database.');
            return true;
        }

        console.log('User |' + userName + '| not found.');
        return false;
    } catch(error) {
        console.log('Error searching user |' +userName + '|. Error: ' + error);
        return null;
    }
}

module.exports = {
    createUser: createUser,
    findUser: findUser
}