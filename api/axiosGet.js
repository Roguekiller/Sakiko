const axios = require('axios');

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