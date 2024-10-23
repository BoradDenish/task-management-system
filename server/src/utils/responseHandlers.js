exports.successResponse = (msg) => {
  const data = { success: 1, message: msg };
  return data;
};

exports.successResponseWithData = (msg, data) => {
  const resData = { success: 1, message: msg, data: data };
  return resData;
};

exports.errorResponse = (msg) => {
  const data = { success: 0, message: msg };
  return data;
};

exports.notFoundResponse = (msg) => {
  const data = { success: 0, message: msg };
  return data;
};

exports.validationErrorWithData = (msg, data) => {
  const resData = { success: 0, message: msg, data: data };
  return resData;
};

exports.unauthorizedResponse = (msg) => {
  const data = { success: 2, message: msg };
  return data;
};
