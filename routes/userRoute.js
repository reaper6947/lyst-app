const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
router.get("/:userId", ...user.get);
module.exports = router;
