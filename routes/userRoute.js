const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
router.get("/:userId", ...user.get);
router.get("/:userId/newList", ...user.getLists)
router.get("/p/lists", ...user.publicLists)
router.post("/:userId/newList", ...user.post);
router.delete("/:userId/delete/:listId", ...user.delete)
router.put("/:userId/update/:listId", ...user.updateList)
module.exports = router;
