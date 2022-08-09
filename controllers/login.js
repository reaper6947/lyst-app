const { loginValidate } = require("../middlewares/userCredValidate");
const { loginStatus, setUserCookie } = require("../middlewares/cookie");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getfunc = (req, res) => {
  res.render("login", { err: "login" });
};

const loginUser = async (req, res, next) => {
  try {
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck === null) {
      res.render("login", { err: "user does not exist, try again" });
    } else if (
      await bcrypt.compare(req.body.password, userCheck.hashedPassword)
    ) {
      req.username = req.body.username;
      //req.hashedPassword = userCheck.hashedPassword;
      next();
    } else {
      res.render("login", { err: "Wrong Password" });
    }
  } catch (err) {
    console.log("loginUser", err);
  }
};

const postfunc = (req, res) => {
  const username = res.username;
  res.redirect(`/u/${username}`);
};

module.exports = {
  get: [loginStatus, getfunc],
  post: [loginValidate, loginUser, setUserCookie, postfunc],
};
