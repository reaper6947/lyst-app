const options = {
  signed: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 20,
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
    "signedCookies" in res &&
    !(Object.keys(res.signedCookies).length === 0)
  ) {
    console.log(res.signedCookies.username, " has logged in", "res");
    res.loggedIn = true;
  } else if (
    "signedCookies" in req &&
    Object.keys(req.signedCookies).length === 0
  ) {
    console.log("no cookie data found");
    res.loggedIn = false;
    req.loggedIn = false;
    
  }

  next();
};
const setUserCookie = (req, res, next) => {
  res.cookie("username", `${req.username}`, options);

  next();
};
module.exports = { loginStatus, setUserCookie };
