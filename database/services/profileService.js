const { sendEphemeralReply } = require('../../helper/channelService');


// Update
async function updateUserProfile(interaction, user, social, link, userModel) {
    //Find user in database. If exist, update social per the social and link. save. Finish.\
    //const user = await findUserProfile(userId, userModel);
    try {
        user["socials"][`${social}`] = link;
        await user.save();
        sendEphemeralReply(interaction, `Added the link ${link} to your social ${social}`);
    } catch(error) {
        console.log(error);
        sendEphemeralReply(interaction, `Check in with Senpai, you could not be registered. Error: ${error}`);
    }
}

module.exports = {
    updateUserProfile: updateUserProfile
}