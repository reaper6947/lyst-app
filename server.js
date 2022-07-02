const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./config/.env" });
const cookieParser = require('cookie-parser')
const path = require("path")
const PORT = process.env.PORT || 3000;
require("./config/db")()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));


const registerRoute = require("./routes/registerRoute");
const homeRoute = require("./routes/homeRoute")

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.SECRET_SALT));

app.use("/api/", registerRoute);
app.use("/",homeRoute)
app.listen(PORT, () => console.log(`server on ${PORT}`));
