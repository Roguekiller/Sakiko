// Check if a user is in a voice channel.
function isMemberInChannel(chatInput) {
    const channel = chatInput.member.voice.channel;
    return (channel !== undefined || channel !== null) ? channel : false;
}

//TODO: Edit/Delete any uncessary information 
// Check if user is in a voice channel with provided output.
function isMemberInChannelWithOutput(chatInput) { 
    const channel = chatInput.member.voice.channel;
    if (!channel) {
        chatInput.channel.send(`Joining halted, join the voice channel!`);
        return false;
    }
    else {
        chatInput.channel.send('Success, connecting!');
        return true;
    }
}

async function sendEphemeralReply(message, string) {
    await message.reply({
        content: string,
        ephemeral: true
    });
}

module.exports = {
    isMemberInChannel: isMemberInChannel,
    sendEphemeralReply: sendEphemeralReply,
}