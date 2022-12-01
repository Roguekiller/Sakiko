const { sendEphemeralReply } = require('../../helper/channelService');

//Create Audio File
async function createAudioEntry(name, fileName, url, message, audioModel) {
    try {
        const dbAudio = new audioModel({name: name, fileName: fileName, url: url});
        console.log('Generating audioFile | ' + name + ' | in the database');

        await dbAudio.save();

        console.log('Saved audioFile | ' + name + ' | in the database');
        sendEphemeralReply(message, `File added to the database`);
    } catch(error) {
        sendEphemeralReply(message, 'Check with Senpai. There was an error creating audio entry.');
        console.log('Error creating Audio Document: ' + error);
    }
}

//Delete Audio File
async function deleteAudioEntry(name, audioModel, message) {

}

module.exports = {
    createAudioEntry: createAudioEntry,
    deleteAudioEntry: deleteAudioEntry,
}
