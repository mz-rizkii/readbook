const code_success = 200;

const code_unknown_error = 500;

const code_invalid_error = 400;

const sendSuccessResponse = (res, response) => {
  res.status(code_success).send(response);
};

const sendErrorResponse = (res, error) => {
  const { status = code_unknown_error, ...error_detail } = error;
  
  res.status(status).send(error_detail);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse
};