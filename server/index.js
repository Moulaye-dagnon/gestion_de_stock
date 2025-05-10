require("dotenv").config();
const express = require("express");
const coockieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(coockieParser());
const port = process.env.PORT || 3000;
const authRoute = require("./route/auth");
app.use("", authRoute);
app.listen(port, (req, res) => {
  console.log("server lance sur le port", port);
});
