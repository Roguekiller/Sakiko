const cheerio = require('cheerio');

async function scrapeMALFavoriteTitle(response) {
    const titleArray = [];
    try {
        const $ = cheerio.load(response.data);
        $('.boxlist-container.anime.mb16').find('.boxlist.col-4').each((i,el) => {
            titleArray.push($(el).find('.di-tc.va-t.pl8.data').find('.title').text());
        });
        return titleArray;
    } catch(error) {
        console.log(error);
        return error;
    }
}

async function scrapeMALUserIcon(response) {
    try {
        const $ = cheerio.load(response.data);
        return $('.user-image.mb8').find('.lazyload').attr('data-src');
    } catch(error) {
        console.log(error); 
        return error;
    }
}

module.exports = {
    scrapeMALFavoriteTitle: scrapeMALFavoriteTitle,
    scrapeMALUserIcon: scrapeMALUserIcon,
}