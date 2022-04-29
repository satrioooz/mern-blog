module.exports = (jwt, id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
