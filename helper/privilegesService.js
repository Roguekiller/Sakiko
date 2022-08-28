const {findRoleOfAuthorByName} = require('../helper/memberService');

// Check if a user is an admin based on a roleName given.
function isAdmin(member, roleName) {
    if(findRoleOfAuthorByName(member, roleName)) return true;
    return false;
}

module.exports = {
    isAdmin: isAdmin,
}