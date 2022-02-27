const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
}

const isValidPassword = async (password, hashedPassword) => {
    const passwordStatus = await bcrypt.compare(password, hashedPassword);
    return passwordStatus ? true : false;
}

module.exports = {
    hashPassword,
    isValidPassword
}