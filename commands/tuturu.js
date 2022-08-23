const { SlashCommandBuilder } = require('discord.js');
const { isMemberInChannel } = require('../helper/channelService');
const { generateVoiceChannel } = require('../helper/voiceConnectionSerivce');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tuturu')
        .setDescription('Cutest Audio File'),
    async execute(interaction) {
        const channelExists = isMemberInChannel(interaction);
        (channelExists) ? generateVoiceChannel(channelExists)
        : await interaction.reply({
            content: 'No Users Connected',
            ephemeral: true
        });
    }
}