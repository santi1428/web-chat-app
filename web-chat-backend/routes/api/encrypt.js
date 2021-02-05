const bcrypt = require('bcrypt');

const saltRounds = 10;

const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePassword = async (plainPassword, hashedPassword) => {
    const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return passwordMatch;
}

module.exports = { encryptPassword, comparePassword }
