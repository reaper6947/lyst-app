const options = {
  signed: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 2000,
  sameSite: true,
};

const loginStatus = (req, res, next) => {
  if (
    "signedCookies" in req &&
    !(Object.keys(req.signedCookies).length === 0)
  ) {
    console.log(req.signedCookies.username, " has logged in", "req");
    req.loggedIn = true;
  } else if (
    "signedCookies" in req &&
    Object.keys(req.signedCookies).length === 0
  ) {
    console.log("no cookie data found");
    req.loggedIn = false;
  }

  next();
};

const setUserCookie = (req, res, next) => {
  res.cookie("username", `${req.username}`, options);
  res.loggedIn = true
  res.username = req.username
  console.log(`${req.username} has logged in res`);
  next();
};
module.exports = { loginStatus, setUserCookie };
