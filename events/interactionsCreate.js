module.exports = {
    name: 'interactionCreate',
	on: true,
    async execute(interaction) {

		//If the interaction is not of type ChatInputCommand then return.
	    if (!interaction.isChatInputCommand()) return;

	    const command = interaction.client.commands.get(interaction.commandName);

	    if (!command) return;

		//Execute the specific command.
	    try {
		    await command.execute(interaction);
	    } catch (error) {
		    console.error(error);
		    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    }
    }
}