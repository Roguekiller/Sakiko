const { SlashCommandBuilder } = require('discord.js');
const { createUser, findUser } = require('../database/services/userServices');
const { sendEphemeralReply } = require('../helper/channelService');
const { generateUserModel } = require('../database/model/userModel');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('register-u')
    .setDescription('register to the database'),
    async execute(interaction) {
        const userId = interaction.member.user.id;
        const userName = interaction.member.user.username;
        const userModel = await generateUserModel();
        const foundUser = await findUser(userId, userName, userModel);
        if(!foundUser && foundUser !== null) {
            await createUser(interaction, userId, userName, userModel);
            interaction.user.send('You can now add links to your socials. Run the **/user-socials** command and choose which ones you want to add.');
        } else {
            sendEphemeralReply(interaction, `You're registered. If this is wrong, check with the senpai!`);
        }
    }
}