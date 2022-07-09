const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
router.get("/login", login.get);
router.post("/login",login.loginValidate, login.post);
module.exports = router;