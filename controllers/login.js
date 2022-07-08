module.exports = {
    get: (req, res) => {
      res.render("login");
     
      },
      post: (req, res) => {
          console.log(req.body)
          res.redirect("/")
      }
  };
  