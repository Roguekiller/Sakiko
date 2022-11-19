const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendEphemeralReply, } = require('../helper/channelService');
const { findUser } = require('../database/services/userServices');
const { generateUserModel } = require('../database/model/userModel');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('socials-profile')
    .setDescription('Displaying user profile with socials included')
    .addSubcommand(subcommand => 
        subcommand
            .setName('self')
            .setDescription('Display your profile with your socials'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('user')
            .setDescription('Display profile of user socials')
            .addUserOption((option) => 
                option.setName('user')
                    .setDescription('Requires a user as a mention')
                    .setRequired(true)
                )
            ),
    async execute(interaction) {
        const userModel = await generateUserModel();
        const author = interaction.member.user.username;

        try {
            if(interaction.options.getSubcommand() === 'self') {
                const userObject = await constructObject(interaction.member.user.username, interaction.member.user.id, 
                    interaction.member.user.displayAvatarURL(), userModel);
                ifUserExistsCreateEmbed(interaction, userObject, author);
            } else {
                const targetUser = interaction.options.getUser('user');
                console.log(targetUser);
                const userObject = await constructObject(targetUser.username, targetUser.id, 
                    targetUser.displayAvatarURL(), userModel);
                ifUserExistsCreateEmbed(interaction, userObject, author);
            }
        } catch(error) {
            console.log(error);
            sendEphemeralReply(interaction, `Error: ${error}.`);
        }
    }
}

// If users exists create an embed with the given information inside of the userObject
function ifUserExistsCreateEmbed(interaction, userObject, author) {
    if(userObject.user && userObject.user !== null) {
        const socialObject = userObject.user.socials.toObject();
        const embed = createEmbed(socialObject, userObject.userName, userObject.avatar, author);
        interaction.channel.send({embeds: [embed]});
        sendEphemeralReply(interaction,'Completed.');
    } else {
        sendEphemeralReply(interaction, `Is ${userObject.userName} registered? Check with the Senpai.`);
    }
}


// Create an object with discord member information to pass as paramaters to embed.
async function constructObject(userName, userId, avatar, model) {
    let object = {
        userName: userName,
        userId: userId,
        avatar: avatar,
        user: await findUser(userId, userName, model)
    };

    return object;
}

// Creating an embed with the passed in userObject and appending fields
function createEmbed(socialObject, userName, avatar, author) {
    let embed = new EmbedBuilder()
    .setColor(0x7d34eb)
    .setTitle(`${userName} Socials Profile`)
    .setAuthor({name: `${author}`, iconURL: avatar})
    .setDescription(`User's social profile`)
    .setThumbnail(`${avatar}`)
    .setTimestamp()

    let i = 0;
    for(const social in socialObject) {
        if(i < 5) {
            embed.addFields({name: social, value: socialObject[social]});
            i++;
        }
    }

    return embed;
}