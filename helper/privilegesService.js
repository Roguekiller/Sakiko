const {findRoleOfAuthorByName} = require('../helper/memberService');

function isAdmin(member, roleName) {
    if(findRoleOfAuthorByName(member, roleName)) return true;
    return false;
}


module.exports = {
    isAdmin: isAdmin,
}