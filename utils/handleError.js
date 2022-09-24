const handleHttpError = (res, message = "Something happened", code = 403) => {
  res.status(code).send({ message });
};

module.exports = handleHttpError;
