const express = require("express");
const router = express.Router();
const register = require("../controllers/login");
router.get("/login", register.get);
router.post("/login", register.post);
module.exports = router;