const axios = require('axios');

// Hits MyAnimeList(MAL) favorites enpoint using a users name.
// Returns the existing profile or false if no user exists by name 
async function getMalProfileFavorites(userName) {
    const profileExists = axios.get(`https://myanimelist.net/profile/${userName}/favorites`).then((response) => {
        return response;
    }).catch(() => {
        return false;
    });

    return profileExists;
}

module.exports = {
    getMalProfileFavorites: getMalProfileFavorites,
}