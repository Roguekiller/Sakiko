const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echos a message you write back to you.')
        .addStringOption((option) =>
            option
            .setName("translation") //Variable Name
            .setDescription('Place a message')
            .setRequired(true)
            ),
    async execute(interaction) {
        await interaction.reply({
            content: interaction.options.getString("translation"), //Variable reference
            ephemeral: true,
        });
    }
};