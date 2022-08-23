const { findMemberById, findRoleOfMemberByName, sendUserMentionMessage } = require('../helper/memberService');
const { sendEphemeralReply } = require('../helper/channelService')
/*
// Find if user who sent message has role by Id. Parameters{roleId: number, user: ChatInputCommand}
function findRoleById(roleId, user) {
    if(!checkIfRoleIdOrUserExist(roleId, user)) return;

    const hasRole = user.member.roles.cache.has(roleId);
    return hasRole;
}

// Find if user who sent message has role by Name. Parameters{roleName: string, user: ChatInputCommand}
function findRoleByName(roleName, user) {
    if(!checkifRoleNameOrUserExist(roleName, user)) return;

    const hasRole = user.member.roles.cache.some(role => role.name === roleName);
    return hasRole;
}

function findRoleOfUser(roleId, user) {
    if(!checkIfRoleIdOrUserExist(roleId, user)) return;
}

function checkIfRoleIdOrUserExist(roleId, user) {
    return (!roleId || !user) ? false : true;
}

function checkifRoleNameOrUserExist(roleName, user) {
    return (!roleName || !user) ? false : true;
}


function addRoleToAuthor(roleName, user) {
}*/

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

function getRoleByName(roleName, user) {
    return user.member.guild.roles.cache.find(role => role.name === roleName);
}

module.exports = {
    addRoleToUser: addRoleToUser,
    removeRoleByUser: removeRoleByUser,
    getUserRoles: getUserRoles,
}