const { SlashCommandBuilder } = require('discord.js');
const { findRoleOfAuthorByName, findMemberById } = require('../helper/memberService.js');
const { findRoleById, removeRoleByUser, addRoleToUser } = require('../helper/roleService.js');
const { SS } = require('../json/roles.json');
const { isAdmin } = require('../helper/privilegesService');
const { sendEphemeralReply } = require('../helper/channelService');

// Command to handle role managing, with subcommands to remove a role or add a role.
// Remove role requires admin privileges and adding a role equivalent to admin requires admin.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Manage roles of users. (Remove/Add)')
        .addSubcommand(subcommand => 
            subcommand
                .setName('remove')
                .setDescription('Remove role')
                .addRoleOption((option) =>  
                    option.setName('role')
                    .setDescription('Requires a specific role as a mention.')
                    .setRequired(true)
                )
                .addUserOption((option) =>
                    option.setName('user')
                    .setDescription('Requires a user as a mention.')
                    .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add role.').addRoleOption((option) =>  
                option.setName('role')
                .setDescription('Requires a specific role as a mention.')
                .setRequired(true)
            )
            .addUserOption((option) =>
                option.setName('user')
                .setDescription('Requires a user as a mention.')
                .setRequired(true),
            )
    ),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const targetUser = interaction.options.getUser('user');
        try {
            if(interaction.options.getSubcommand() === "remove") {
                if(isAdmin(interaction, SS)) {
                    await removeRoleByUser(role.name, interaction, targetUser.id);
                } else {
                    await interaction.reply(`Not an admin!`);
                }
            } else {
                await addRole(interaction, role.name, targetUser.id);
            }
        } catch(error) {
            console.log(error);
            await sendEphemeralReply(interaction, `Error: ${error}`);
        }
    }
}


// Local function for privilege check before adding roles to user.
async function addRole(interaction, roleName, userId){
    if(isAdmin(interaction, SS)) {
        await addRoleToUser(roleName, interaction, userId);
    } else if(!isAdmin(interaction, SS) && roleName !== SS) {
        await addRoleToUser(roleName, interaction, userId);
    } else {
        await interaction.reply('Not an admin!');
    }
}