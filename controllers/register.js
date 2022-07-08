module.exports = {
  get: (req, res) => {
    res.render("register");
   
    },
    post: (req, res) => {
        console.log(req.body)
        res.redirect("/api/login")
    }
};
