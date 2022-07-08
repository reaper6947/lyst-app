const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
router.get("/register", register.get);
router.post("/register", register.post);
module.exports = router;
