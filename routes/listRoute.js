const express = require("express");
const router = express.Router();
const list = require("../controllers/list");
router.get("/:userId/:listId",...list.getListData)
router.get("/:listId", ...list.getList);

module.exports = router;