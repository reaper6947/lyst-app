const mongoose = require("mongoose");
const listSchema = new mongoose.Schema(
  {
    ID: String,
    author: String,
    title: String,
    privacy: Boolean,
    collaborators: [{ name: String,editor:Boolean,viewer:Boolean }],
    items: [{}],
  },
  { timestamps: true }
);

const List = mongoose.model("list", listSchema);
module.exports = List;
