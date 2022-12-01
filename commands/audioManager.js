const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendEphemeralReply } = require('../helper/channelService');
const { generateAudioModel } = require('../database/model/audioModel');
const { createAudioEntry } = require('../database/services/audioService');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('audio')
    .setDescription('audio manager')
    .addAttachmentOption(subcommand =>
        subcommand
            .setName('upload')
            .setDescription('Command to mange uploading audio')
            .setRequired(true)
            )
        .addStringOption((option) => 
            option.setName('name')
                .setDescription('Optional naming of the file.')
                .setRequired(true)  
            ),
    async execute(interaction) { 
        const audioModel = await generateAudioModel();
        const attachment = interaction.options.getAttachment('upload');
        const attachmentName = interaction.options.getString('name');
        
        if(attachment.contentType == 'audio/mpeg') {
            await createAudioEntry(attachmentName, attachment.name, attachment.url, interaction, audioModel);
        } else {
            sendEphemeralReply(interaction, 'Please use an audio file!');
        }
    }
}