const { loginStatus } = require("../middlewares/cookie");

const get = (req, res, next) => {
  res.render("home");
};

module.exports = {
  get: [loginStatus, get],
  post: [],
};
