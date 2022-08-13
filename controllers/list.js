const { loginStatus } = require("../middlewares/cookie");
const List = require("../models/listModel")

const getListData = async (req, res, next) => {
    const { listId, userId } = req.params;
    try {
        const foundList = await List.findOne({ ID: listId });
        if (req.loggedIn) {

            if (foundList.collaborators.includes(userId) || foundList.author == userId) {
                res.json(foundList)
            }
            else {
                if (foundList.isPrivate) {
                    res.redirect("/api/register")
                } else {
                    res.json(foundList)
                }
            }

        } else if (req.loggedIn == false) {
            if (foundList.isPrivate) {
                res.redirect("/api/register")
            } else {
                console.log("can view from public")
                res.json(foundList)
            }
        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }
};


const getList = async (req, res, next) => {
    const { listId } = req.params;
    try {
        const foundList = await List.findOne({ ID: listId });
        if (req.loggedIn) {
            const userId = req.signedCookies.username
            if (foundList.collaborators.includes(userId) || foundList.author == userId) {
                console.log("can edit")
                res.render("authList", { userId })
            }
            else {
                if (foundList.isPrivate) {
                    res.redirect("/api/register")
                } else {
                    res.render("list")
                }
            }

        } else if (req.loggedIn == false) {
            if (foundList.isPrivate) {
                res.redirect("/api/register")
            } else {
                console.log("can view from public")
                res.render("list")
            }
        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }


};


module.exports = {
    getListData: [loginStatus, getListData],
    getList: [loginStatus, getList],
};
