const { loginValidate } = require("../middlewares/userCredValidate");
const { loginStatus, setUserCookie } = require("../middlewares/cookie");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const get = (req, res) => {
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

const post = (req, res) => {
  console.log("login post");
  res.redirect("/");
  //res.render("home")
};

module.exports = {
  get: [get],
  post: [loginValidate, loginUser, setUserCookie, loginStatus, post],
};
