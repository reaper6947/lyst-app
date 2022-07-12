const express = require("express");
const router = express.Router();
const reg = require("../controllers/register");
router.get("/register", ...reg.get);
router.post("/register", ...reg.post);
module.exports = router;
