const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
router.get("/:userId", ...user.get);
router.get("/:userId/newList",...user.getLists)
router.post("/:userId/newList", ...user.post);
router.delete("/:userId/delete/:listId",...user.delete)
module.exports = router;
