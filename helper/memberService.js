// Find a user of the server based on their id.
function findMemberById(user, userId) {
    return user.member.guild.members.cache.find(user => user.id === userId);
}

// Find a role of a specific member of a server.
function findRoleOfMemberByName(user, roleName) {
    return user.roles.cache.some(role => role.name === roleName);
}

// Find a specific role of the user who interacted with the discord bot.
function findRoleOfAuthorByName(user, roleName) {
    return user.member.roles.cache.some(role => role.name === roleName);
}

// Send message to channel where the command was used. Exclusive function for GAP choosing.
function sendUserMentionMessage(user, member) {
    user.channel.send(`You're so lucky ${member.user}! Don't let it go to your head.`);
}

module.exports = {
    findMemberById: findMemberById,
    findRoleOfAuthorByName : findRoleOfAuthorByName,
    findRoleOfMemberByName: findRoleOfMemberByName,
    sendUserMentionMessage: sendUserMentionMessage,
}