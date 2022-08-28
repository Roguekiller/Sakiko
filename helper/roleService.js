const { findMemberById, findRoleOfMemberByName, sendUserMentionMessage } = require('../helper/memberService');
const { sendEphemeralReply } = require('../helper/channelService')

// Adding a role to a specified user.
async function addRoleToUser(roleName, user, userId) {
    const role = getRoleByName(roleName, user);
    const member = findMemberById(user, userId);
    if(findRoleOfMemberByName(member, roleName)) {
        await sendEphemeralReply(user, `${member.user.username} has that role!`);
    } else { 
        await member.roles.add(role);
        await sendEphemeralReply(user, `Succesfully added role to ${member.user.username}!`);
    }
}

// Remove a role to a specified user.
async function removeRoleByUser(roleName, user, userId){
    const role = getRoleByName(roleName, user);
    const member = findMemberById(user, userId);
    if(findRoleOfMemberByName(member, roleName)) {
        await member.roles.remove(role);
        await sendEphemeralReply(user, `Succesfully removed role from ${member.user.username}!`);
    } else { 
        await sendEphemeralReply(user, `${member.user.username} had no role with that name!`);
    }
}

//Returns array of user roles
async function getUserRoles(user) {
    var roles = [];
    user.roles.cache.forEach(role => {
        roles.push(role.name);
    });
    return roles;
}

// Return a role by rolename.
function getRoleByName(roleName, user) {
    return user.member.guild.roles.cache.find(role => role.name === roleName);
}

module.exports = {
    addRoleToUser: addRoleToUser,
    removeRoleByUser: removeRoleByUser,
    getUserRoles: getUserRoles,
}