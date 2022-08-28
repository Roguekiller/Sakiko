// Check if a user is in a voice channel and return channel if true.
function isMemberInChannel(chatInput) {
    const channel = chatInput.member.voice.channel;
    return (channel !== undefined || channel !== null) ? channel : false;
}

// Takes in an interaction and string, returning back a message visible to the user who called the command.
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