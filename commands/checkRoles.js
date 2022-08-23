const { SlashCommandBuilder } = require('discord.js');

//TODO: Figure out why the interaction.channel.send sends an empty array 
// but the reply doesn't 
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

async function getRoles(user) {
    var roles = [];
    await user.member.roles.cache.forEach(role => {
        roles.push(role.name);
    });
    return roles;
}

async function sendMessage(message) {
    const userRoles = await (await getRoles(message)).reduce(
        (previousValue, currentValue) => `${previousValue}, ${currentValue}`,
    );
    message.channel.send({content: userRoles, ephemeral: true});
}