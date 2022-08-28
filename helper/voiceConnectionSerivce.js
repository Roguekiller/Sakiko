const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus  } = require('@discordjs/voice');
const { sendEphemeralReply } = require('./channelService');

// Exported Function: Bot joins text channel.
function generateVoiceChannel(channel, interaction) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guildId,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    generateAudioPlayer(connection, interaction);
}

// Create a new AudioPlayer Object.
function generateAudioPlayer(connection, interaction) {
    const player = createAudioPlayer(
    );
    playSound(player, getAudio());
    connectToVoice(player, connection);
    onAudioStop(player, connection, interaction);
}


// Return specific audio file.
function getAudio() {
    return createAudioResource('../audio/Tuturu.mp3');
}

// Play the sound.
function playSound(audioplayer, audioSource) {
    audioplayer.play(audioSource);
}

// Connect to a voice channel.
function connectToVoice(player, connection) {
    connection.subscribe(player);

}

// Checks the audio player state status and destroys the connection if idle.
function onAudioStop(player, connection, interaction) {
    player.on('stateChange', (oldState, newState) => { 
        if(newState.status == AudioPlayerStatus.Idle) {
            connection.destroy();
            sendEphemeralReply(interaction, 'Completed!');
        }
    });
}

module.exports = {
    generateVoiceChannel: generateVoiceChannel
}