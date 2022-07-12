const get = (req, res, next) => {
  console.log(req.signedCookies.username, "wants to logout");
  res.clearCookie("username");
  res.redirect("/");
};

module.exports = {
  "get": [get],
};
