const { SlashCommandBuilder } = require('discord.js');
const { isMemberInChannel, sendEphemeralReply } = require('../helper/channelService');
const { generateVoiceChannel } = require('../helper/voiceConnectionSerivce');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tuturu')
        .setDescription('Cutest Audio File'),
    async execute(interaction) {
        const channelExists = isMemberInChannel(interaction);
        (channelExists) ? generateVoiceChannel(channelExists, interaction)
        : sendEphemeralReply(interaction, 'Join a voice channel and send the command again!');
    }
}