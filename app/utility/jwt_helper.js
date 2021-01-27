require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth_secret = process.env.JWT_SECRET;

const issuer = process.env.JWT_ISSUER;

const audience = process.env.JWT_AUDIENCE;

const expiresIn = 24 * 60 * 60000;

const signToken = async (payload) => new Promise((resolve, reject) => {
  return jwt.sign(payload, auth_secret, { expiresIn, issuer, audience }, (error, token) => {
    if (error) {
      reject(error);
    }

    resolve(token);
  });
});

const verifyToken = async (token) => new Promise((resolve, reject) => {
  return jwt.verify(token, auth_secret, { issuer, audience }, (error, token) => {
    if (error) {
      reject(error);
    }

    resolve(token);
  });
});

module.exports = { signToken, verifyToken };