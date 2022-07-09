const { loginValidate } = require("../middlewares/userCredValidate");

const get = (req, res) => {
  res.render("login", { err: "login" });
};

const userCheck = (req, res, next) => {
  
}

const post = (req, res) => {
  console.log("login post");
  res.render("home");
};
module.exports = {
  loginValidate,
  get,
  post,
};
