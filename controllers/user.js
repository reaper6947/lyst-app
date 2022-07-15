const { loginStatus } = require("../middlewares/cookie")

const get = (req, res, next) => {
    const {userId} = req.params
    if (req.loggedIn) {
        if (req.signedCookies.username == userId) {
            res.render("user",{userId})
        } else {
            res.redirect("/api/login")
        }
    } else {
        res.redirect("/api/login")
    }
    
}


module.exports = {
    get:[loginStatus,get]
}