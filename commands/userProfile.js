const { SlashCommandBuilder } = require('discord.js');
const { sendEphemeralReply } = require('../helper/channelService');
const { findUser } = require('../database/services/userServices');
const { generateUserModel } = require('../database/model/userModel');
const { updateUserProfile } = require('../database/services/profileService');



module.exports = {
    data: new SlashCommandBuilder()
    .setName('user-socials')
    .setDescription('Add links to your socials.')
    .addStringOption((option) => 
        option.setName('social')
            .setDescription('Choose one of the choices')
            .setRequired(true)
            .addChoices(
                {name:'twitter', value:'twitter'},
                {name:'youtube', value:'youtube'},
                {name:'twitch', value:'twitch'},
                {name:'tiktok', value:'tiktok'},
                {name:'myAnimeList', value:'myAnimeList'},
            ))
        .addStringOption((option) =>
                option.setName('link')
                    .setDescription('Enter your social link for the specified choice')
                    .setRequired(true)
        ),
    async execute(interaction) {
        const userId = interaction.member.user.id;
        const userName = interaction.member.user.username;
        const choice = interaction.options.getString('social');
        const link = interaction.options.getString('link');
        const userModel = await generateUserModel();

        const isUser = await findUser(userId, userName, userModel);
        if(isUser && isUser !== null) {
            const json = await updateUserProfile(interaction, isUser, choice, link, userModel);
        } else {
            sendEphemeralReply(interaction, `Are you registered? If so check with an admin, otherwise use /register-u command.`);
        }
    }
}