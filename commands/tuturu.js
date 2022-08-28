const { SlashCommandBuilder } = require('discord.js');
const { isMemberInChannel, sendEphemeralReply } = require('../helper/channelService');
const { generateVoiceChannel } = require('../helper/voiceConnectionSerivce');

//Command for playing a sound byte of a popular anime sound.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tuturu')
        .setDescription('Cutest Audio File'),
    async execute(interaction) {
        //Check if a user is connected to a voice channel. Will play the sound if true, and return an ephemeral reply if not.
        const channelExists = isMemberInChannel(interaction);
        (channelExists) ? generateVoiceChannel(channelExists, interaction)
        : sendEphemeralReply(interaction, 'Join a voice channel and send the command again!');
    }
}