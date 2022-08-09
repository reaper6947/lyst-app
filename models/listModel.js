const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    ID: String,
    author: String,
    title: String,
    isPrivate: Boolean,
    description: String,
    collaborators: [{ name: String, editor: Boolean }],
    items: [{}],
  },
  { timestamps: true }
);

const List = mongoose.model("list", listSchema);
module.exports = List;
