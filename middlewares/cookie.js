const options = {
    signed: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 15,
    sameSite: true,
};
  
const isCookiePresent = (req, res, next) => {
    console.log(req.signedCookies)
    next()
}
const setCookie = (req, res, next) => {
    next()
}
module.exports = {isCookiePresent,setCookie}