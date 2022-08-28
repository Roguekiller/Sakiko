const { SlashCommandBuilder } = require('discord.js');

// Return roles of a user. Designed to be a tester function during early development stages.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Testing Purposes'),
    async execute(interaction) {
        await sendMessage(interaction);

        await interaction.reply({
            content: 'Yesp',
            ephemeral: true
        });
    }
};

// Local function used to return all roles of the user.
async function getRoles(user) {
    var roles = [];
    await user.member.roles.cache.forEach(role => {
        roles.push(role.name);
    });
    return roles;
}

// Send a message to the channel with the roles of the user.
async function sendMessage(message) {
    const userRoles = await (await getRoles(message)).reduce(
        (previousValue, currentValue) => `${previousValue}, ${currentValue}`,
    );
    message.channel.send({content: userRoles, ephemeral: true});
}