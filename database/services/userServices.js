//Service file for handling user interactions
const mongoose = require('mongoose');
const { userSchema } = require('../schema/userSchema');
const { generateUserModel } = require('../model/userModel');
const { sendEphemeralReply } = require('../../helper/channelService');

// C - Async function for creating the specified user in the database.
async function createUser(message, userId, userName, userModel) {
    try {
        const dbUser = new userModel({discordId: userId, userName: userName, socials: undefined});
        console.log('Generating user |' + userName + '| in the database.');
        
        await dbUser.save();
        
        console.log('Saved user |' + userName + '| in the database.');
        sendEphemeralReply(message, `You're registered! Thank you!`);
    } catch(error) {
        sendEphemeralReply(message, 'Check with Senpai. There was an error registering you.');
        console.log('Error creating user: ' + error);
    }
}

// R - Async function for finding the user in the documents of the database.
async function findUser(userId, userName, userModel) {
    try {
        console.log('Searching for user |' + userName + '| in the database!');
        const dbUser = await userModel.findOne({ discordId: userId }).exec();
        if(dbUser !== null) {
            console.log('Found user |' + dbUser.userName + '| in the database.');
            return dbUser;
        }

        console.log('User |' + userName + '| not found.');
        return false;
    } catch(error) {
        console.log('Error searching user |' + userName + '|. Error: ' + error);
        return null;
    }
}

// D - Asnyc function for deleting a single user from the database.
async function deleteUser(userName, userId, userModel) {
    try {
        console.log('Processing deletion for user |' + userName + '| in the database.');
        const userExist = await findUser(userId, userName, userModel);
        if(userExist !== null && userExist) {
            await userModel.deleteOne({ discordId: userId });
            
            console.log('Deleted user |' + userName + '| from the database.');
            return true;
        } else {
            console.log(`User |` + userName + `| doesn't exist.`);
            return false;
        }
    } catch(error) {
        console.log('Error deleting user |' + userName + '|. Error' + error);
        return null;
    }
}

module.exports = {
    createUser: createUser,
    findUser: findUser,
    deleteUser: deleteUser,
}