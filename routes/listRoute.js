const express = require("express");
const router = express.Router();
const list = require("../controllers/list");
router.get("/:userId/:listId",...list.getListData)
router.get("/:listId", ...list.getList);
router.get("/p/:listId",list.getListPublic)

module.exports = router;