// @ts-nocheck
const { nanoid } = require("nanoid");

const extractList = (obj) => {
  if (obj.ID === "" || obj.ID.length == 0) {
    obj.ID = nanoid(10);
  }

  const { ID, author, title, isPrivate, description, isMarked, collaborators, items } =
    obj;
  //validation
  return {
    ID,
    author,
    title,
    isPrivate,
    description,
    isMarked,
    collaborators,
    items,
  };
};

module.exports = { extractList };
