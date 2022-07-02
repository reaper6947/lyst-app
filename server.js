const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT || 3000;
const DB = require("./config/db")
DB()

const register_route = require("./routes/registerRoute");
const home = require("./routes/homeRoute")
app.use("/api/", register_route);
app.use("/",home)
app.listen(PORT, () => console.log(`server on ${PORT}`));
