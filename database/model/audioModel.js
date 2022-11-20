const mongoose = require('mongoose');
const { audioSchema } = require('../schema/audioSchema');

async function generateAudioModel(){
    const audioDocument = mongoose.model('Audio', audioSchema);
    return audioDocument;
}

module.exports = {
    generateAudioModel: generateAudioModel,
}