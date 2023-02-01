module.exports.error = (msg = "something went wrong", status = 400) => {
  const err = new Error(msg);
  err.status = status;
  return err;
};
