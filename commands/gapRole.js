const { SlashCommandBuilder } = require('discord.js');
const { parseMentions, randomGenerator } = require('../helper/utilityService');
const { addRoleToUser, removeRoleByUser, findRoleById } = require('../helper/roleService');
const { GAP, SS } = require('../json/roles.json');
const { findRoleOfAuthorByName, findMemberById } = require('../helper/memberService');
const { sendUserMentionMessage } = require('../helper/memberService');

// Command with subcommands for choosing a new person for the role GAP 
// And command to remove the role GAP.
module.exports = { 
    data: new SlashCommandBuilder()
        .setName('gap')
        .setDescription('Generic Anime Protagonist Manager')
        .addSubcommand(subcommand =>
            subcommand
                .setName('choosing')
                .setDescription(`Random choosing who gets to be the next GAP!`)
                .addStringOption(option =>
                    option.setName('users')
                        .setDescription('@Mentions required for the input.')
                        .setRequired(true)
                    )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove gap from user through Mention.')
                .addStringOption(option =>
                    option.setName('user')
                        .setDescription('@Mention required for the input.')
                        .setRequired(true)
                    )
        ),
    async execute(interaction) {
        if(findRoleOfAuthorByName(interaction, SS)) {
            const choosenSub = interaction.options.getSubcommand();
            //If the subcommand is choosing, parse the mentions of users and choose a random person.
            if(choosenSub === 'choosing') {
                try {
                    const userArray = parseMentions(interaction.options.getString("users"));
                    const choosenUser = userArray[randomGenerator(userArray.length)];
                    await sendUserMentionMessage(interaction, findMemberById(interaction, choosenUser));
                    await addRoleToUser(GAP, interaction, choosenUser);
                } catch(error) {
                    return await interaction.reply({
                        content: `${error}`,
                        ephemeral: true
                    });
                }
            } else {
                const user = parseMentions(interaction.options.getString('user'));
                await removeRoleByUser(GAP, interaction, user[0]);
            }
        } else {
            return await interaction.reply(`Nope! You're not a senpai!`);
        }
    }
}


