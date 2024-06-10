const bcrypt = require('bcrypt');
require('dotenv').config();

const hashPassword = async (password) => {
    const hashedPWD = await bcrypt.hash(password + process.env.PEPPER_KEY, 10);
    return hashedPWD
}

const comparePassword = async (password, hashPassword) => {
    const isValid = await bcrypt.compare(password + process.env.PEPPER_KEY, hashPassword);
    return isValid
};

module.exports = {
    hashPassword,
    comparePassword
}