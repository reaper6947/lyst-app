const { loginStatus } = require("../middlewares/cookie");
const { extractList } = require("../middlewares/newListUtil");
const List = require("../models/listModel")

const get = (req, res, next) => {
  const { userId } = req.params;
  if (req.loggedIn) {
    if (req.signedCookies.username == userId) {
      res.render("user", { userId });
    } else {
      res.redirect("/api/login");
    }
  } else {
    res.redirect("/api/login");
  }
};

const newList = async (req, res, next) => {
  const { userId } = req.params;
  if (req.loggedIn) {
    if ((req.signedCookies.username = userId)) {
      const newList = extractList(req.body);
      const savedList = new List(newList)
      console.log(savedList)
      savedList.save()
      res.json(newList);
    }
  }
  next();
};

const getLists = async (req, res, next) => {
  const { userId } = req.params;
  if (req.loggedIn) {
    if (req.signedCookies.username == userId) {
      const foundLists = await List.find({ author: userId });
      res.json(foundLists)
    } else {
      res.redirect("/api/login");
    }
  } else {
    res.redirect("/api/login");
  }
};


const deleteList = async (req, res) => {
  const { userId, listId } = req.params;
  if (req.loggedIn) {
    if ((req.signedCookies.username = userId)) {
      try {
        let resp = await List.deleteOne({ ID: listId });
        res.status(200);
        res.send(resp)
      } catch (err) { console.log(err) }
    }
  }

}
const getPublicLists = async (req, res) => {
  const foundLists = await List.find({ isPrivate: false });
  res.json(foundLists)
}


const updateListFunc = async (req, res) => {
  const { userId, listId } = req.params;
  if (req.loggedIn) {
    if ((req.signedCookies.username = userId)) {
      try {
        let updatedList = await List.findOneAndUpdate({ ID: listId }, req.body)
        res.json(updatedList)

      } catch (err) { console.log(err) }
    }
  }
}

module.exports = {
  get: [loginStatus, get],
  post: [loginStatus, newList],
  getLists: [loginStatus, getLists],
  publicLists: [getPublicLists],
  updateList: [loginStatus, updateListFunc],
  delete: [loginStatus, deleteList]
};
