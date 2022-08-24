// Check if a user is in a voice channel.
function isMemberInChannel(chatInput) {
    const channel = chatInput.member.voice.channel;
    return (channel !== undefined || channel !== null) ? channel : false;
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