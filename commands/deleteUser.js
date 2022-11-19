const { SlashCommandBuilder } = require('discord.js');
const { sendEphemeralReply } = require('../helper/channelService');
const { isAdmin } = require('../helper/privilegesService');
const { SS } = require('../json/roles.json');
const { deleteUser } = require('../database/services/userServices');
const { generateUserModel } = require('../database/model/userModel');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('db-remove')
    .setDescription('Removing users from database.')
    .addSubcommand(subcommand => 
        subcommand
            .setName('self')
            .setDescription('Remove self from database')
            )
    .addSubcommand(subcommand =>
        subcommand
            .setName('user')
            .setDescription('Remove user from the database')
            .addUserOption((option) => 
                option.setName('user')
                    .setDescription('Requires a user as a mention')
                    .setRequired(true)
            )
        ),
    async execute(interaction) {
        //Refactor to use id as opposed to using username.
        const targetUser = interaction.options.getUser('user');
        const userModel = await generateUserModel();

        if(interaction.options.getSubcommand() === 'user') {
            if(isAdmin(interaction, SS)) {
                const isDeleted = await deleteUser(targetUser.username, targetUser.id, userModel);
                userCheck(interaction, isDeleted, targetUser.username);
            } else {
                sendEphemeralReply(interaction, `Admin privelege only! No touchies.`);
            }
        } else {
            const isDeleted = await deleteUser(interaction.member.user.username, interaction.member.user.id, userModel);
            userCheck(interaction, isDeleted, interaction.member.user.username);
        }
    }
}

function userCheck(interaction, isDeleted, userName) {
    if(isDeleted === null || !isDeleted) {
        sendEphemeralReply(interaction, userName + ` not registered.`);
    } else {
        sendEphemeralReply(interaction, userName + ` deleted from the database!`);
    }
}