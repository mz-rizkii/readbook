const express = require('express');

const router = express.Router();

const { hashString } = require('../utility/crypto_helper');

const { signToken } = require('../utility/jwt_helper');
 
const { 
  sendSuccessResponse, 
  sendErrorResponse 
} = require('../utility/response_handler');

const handleLogin = async (req, res) => {
  try {
    const { body: { username, email, password } } = req; 

    const { locals: { db_collection: { user_helper } } } = res;
    
    const { findUserByCredential } = user_helper;

    const encrypted_pass = hashString(password);

    const profile = await findUserByCredential({ username, email, password: encrypted_pass });

    const token = await signToken(profile);

    sendSuccessResponse(res, { profile, token });
  } catch (error) {
    sendErrorResponse(res, error);     
  }
};

const handleRegistration = async (req, res) => {
  try {
    const { body: { username, email, password } } = req; 

    const { locals: { db_collection: { user_helper } } = res;
    
    const { storeUser } = user_helper;

    const encrypted_pass = hashString(password);

    await storeUser({ username, email, password: encrypted_pass });

    const registered = true

    sendSuccessResponse(res, { registered });
  } catch (error) {
    sendErrorResponse(res, error);     
  }
};

router.post('/login', handleLogin);

router.post('/register', handleRegistration);

module.exports = router;