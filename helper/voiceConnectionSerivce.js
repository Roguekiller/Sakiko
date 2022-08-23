const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');


// Exported Function: Bot joins text channel.
function generateVoiceChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    generateAudioPlayer(connection);
}

// Create a new AudioPlayer Object
function generateAudioPlayer(connection) {
    const player = createAudioPlayer();
    playSound(player, getAudio());
    connectToVoice(player, connection);
}

// Future scalable function
function getAudioSource() {

}

// Current Solution
function getAudio() {
    return createAudioResource('../audio/Tuturu.mp3');
}

function playSound(audioplayer, audioSource) {
    audioplayer.play(audioSource);
}

function connectToVoice(player, connection) {
    connection.subscribe(player);

}

function disconnectFromVoice(player, connection) {
    
}

//exports
module.exports = {
    generateVoiceChannel: generateVoiceChannel
}