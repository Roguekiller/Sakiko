function findMemberById(user, userId) {
    return user.member.guild.members.cache.find(user => user.id === userId);
}

function findRoleOfMemberByName(user, roleName) {
    return user.roles.cache.some(role => role.name === roleName);
}

function findRoleOfAuthorByName(user, roleName) {
    return user.member.roles.cache.some(role => role.name === roleName);
}

function sendUserMentionMessage(user, member) {
    user.channel.send(`You're so lucky ${member.user}! Don't let it go to your head.`);
}

module.exports = {
    findMemberById: findMemberById,
    findRoleOfAuthorByName : findRoleOfAuthorByName,
    findRoleOfMemberByName: findRoleOfMemberByName,
    sendUserMentionMessage: sendUserMentionMessage,
}