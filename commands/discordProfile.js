const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendEphemeralReply } = require('../helper/channelService');
const { findMemberById } = require('../helper/memberService');
const { getUserRoles } = require('../helper/roleService');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Shows user profile through embed')
    .addUserOption((option) => 
        option.setName('user')
        .setDescription('User through mention')
        .setRequired(true)
    ),
    async execute(interaction) {
        const targetUser = await findMemberById(interaction, interaction.options.getUser('user').id);
        try {
            const embed = new EmbedBuilder()
            .setColor(0x77dfd5)
            .setTitle(`${targetUser.user.username} Profile`)
            .setAuthor({name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
            .setDescription(`User's info!`)
            .setThumbnail(`${targetUser.user.displayAvatarURL()}`)
            .addFields({name: 'Roles', value: await buildString(targetUser)})
            .setTimestamp()
            .setFooter({text: `${interaction.guild.name}`});
            
            interaction.channel.send({embeds: [embed]});
            sendEphemeralReply(interaction, 'Completed!');
        } catch(error) {
            console.log(error);
            sendEphemeralReply(interaction, `Error: ${error}`);
        }
    }
}

async function buildString(user) {
    const array = await getUserRoles(user);
    string = '';
    for(let i = 0; i < array.length; i++) {
        if(!array[i + 1]) {
            return string + array[i];
        } else {
            string = string + array[i] + ' | ';
        }
    }
}