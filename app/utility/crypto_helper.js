const { SHA256, enc: { Base64 } } = require('crypto-js');

const hashString = (input) => SHA256(input).toString(Base64);

module.exports = { hashString };