const { verifyToken } = require('../utility/jwt_helper');

const { sendErrorResponse } = require('../utility/response_handler');

const getAutHeader = (auth_header) => {
  const bearer_prefix = 'Bearer ';

  return auth_header.substring(bearer_prefix.length);
};

const getLocalData = ({ locals }) => locals;  

const validateAuth = async (req, res, next) => {
  try {
    const token = getAutHeader(req.get('Authorization'));

    const profile = await verifyToken(token);

    res.locals = { ...getLocalData(res), profile };

    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getOptionalAuth = async (req, res, next) => {
  try {
    const token = getAutHeader(req.get('Authorization'));
    
    if (token) {
      const profile = await verifyToken(token);

      res.locals = { ...getLocalData(res), profile };  
    }

    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  validateAuth,
  getOptionalAuth
}