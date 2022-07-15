const { regValidate } = require("../middlewares/userCredValidate");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const get = (req, res) => {
  res.render("register", { err: "register" });
};

const UserSave = async (req, res, next) => {
  try {
    const userExists = await User.exists({ username: req.body.username });
    if (userExists) {
      res.render("register", { err: "username taken, try again" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ username: req.body.username, hashedPassword });
      newUser.save();
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
const post = (req, res) => {
  console.log(req.body, "post");
  res.redirect("/api/login");
};

module.exports = {
  "get": [get],
  "post":[regValidate,UserSave,post]
}
