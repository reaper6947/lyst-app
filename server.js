const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./config/.env" });
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors')
const PORT = process.env.PORT || 3000;
require("./config/db")();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.SECRET_SALT));
app.use(cors())

// registration route 
const registerRoute = require("./routes/registerRoute");
// login route 
const loginRoute = require("./routes/loginRoute");
// home route 
const homeRoute = require("./routes/homeRoute");
// logout  route 
const logoutRoute = require("./routes/logoutRoute");
// get user specific lists route 
const userRoute = require("./routes/userRoute");
// list route 
const listRoute = require("./routes/listRoute");

app.use("/u/", userRoute);
app.use("/l/", listRoute);
app.use("/api/", registerRoute);
app.use("/api/", loginRoute);
app.use("/api/", logoutRoute);
app.use("/", homeRoute);
app.listen(PORT, () => console.log(`server on ${PORT}`));
