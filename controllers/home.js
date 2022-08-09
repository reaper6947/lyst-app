const { loginStatus } = require("../middlewares/cookie");

const getfunc = (req, res, next) => {
  res.render("home");
};

module.exports = {
  get: [loginStatus, getfunc],
  post: [],
};
