const { scrapeMALFavoriteTitle, scrapeMALUserIcon } = require('../helper/scrapingService');

const axios = require('axios');
const { sendEphemeralReply } = require('../helper/channelService');


async function scrapeMALUserFavorites(interaction, userName, icon) {
    try {
        const response = await axios.get(`https://myanimelist.net/profile/${userName}/favorites`);
        return (!icon) ? scrapeMALFavoriteTitle(response) : scrapeMALUserIcon(response);
    } catch(error) {
        if(error) {
            return interaction.channel.send(`This user doesn't exist`);
        } else {
            console.log(error);
            return error;
        }
    }
}


module.exports = {
    scrapeMALUserFavorites: scrapeMALUserFavorites,
}