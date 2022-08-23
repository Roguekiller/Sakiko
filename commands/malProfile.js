const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { scrapeMALUserFavorites } = require('../api/axiosGet');
const { arrayToString, randomGenerator } = require('../helper/utilityService');
const { sendEphemeralReply } = require('../helper/channelService');
const { colors } = require('../json/hexColors.json');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mal-f')
        .setDescription('Scrape users favorite animes if they are posted.')
        .addStringOption((option) => 
            option
                .setName('user')
                .setDescription('Enter MyAnimeList Profile Name')
                .setRequired(true)
            ),
    async execute(interaction) {
        try {
            const user = interaction.options.getString('user');
            const userFavorites = await scrapeMALUserFavorites(interaction, user, false);
            const userIcon = await scrapeMALUserFavorites(interaction, user, true);
            const animeString = arrayToString(userFavorites);
            
            if(userFavorites.length && userFavorites !== null) {
                const file = new AttachmentBuilder('../images/inoueFall.gif');
                const embed = new EmbedBuilder()
                    .setColor(randomHex())
                    .setTitle(`${user}'s MyAnimeList Profile`)
                    .setURL(`https://myanimelist.net/profile/${user}`)
                    .setAuthor({name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
                    .setDescription(`${user}'s favoriete anime.`)
                    .setThumbnail(`${userIcon}`)
                    .setImage('attachment://inoueFall.gif')
                    .addFields({name:'Anime', value: animeString})
                    .setTimestamp()
                    .setFooter({text: `${interaction.guild.name}`});
        
                await sendInteraction(interaction, embed, file);
                sendEphemeralReply(interaction, 'Completed');
            } else {
                sendEphemeralReply(interaction, `No favorite animie for ${user}`);
            }
        } catch(error) {
            console.log(error);
        }
    }
}

async function sendInteraction(interaction, embed, file) {
    interaction.channel.send({embeds: [embed], files: [file]});
}

function randomHex() {
    let colorsArray = [];
    for(let color in colors) {
        colorsArray.push(colors[color]);
    }
    return colorsArray[randomGenerator(colorsArray.length)];
}