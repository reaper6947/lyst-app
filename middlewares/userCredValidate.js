const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().min(8).max(16).required(),
  password: Joi.string().min(8).max(20).required(),
});
const regSchema = loginSchema.keys({
  confirmPassword: Joi.ref('password')
});
//Joi.string().allow(Joi.ref('password')).required()
const regValidate = async (req, res, next) => {
  try {
      const { error, value } = await regSchema.validateAsync(req.body);
      
    if (error == undefined) {
      next();
    }
  } catch (err) {
    res.render("register", { err: err.details[0].message });
  }
};
const loginValidate = async (req, res, next) => {
  try {
      const { error, value } = await loginSchema.validateAsync(req.body);
    if (error == undefined) {
      next();
    }
  } catch (err) {
    res.render("login", { err: err.details[0].message });
  }
};
module.exports = { regValidate, loginValidate };
