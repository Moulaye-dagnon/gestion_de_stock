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
const product = require("./route/produit");
const supplier = require("./route/supplier");
const InStock = require("./route/INStock");
const OutStock = require("./route/OutStock");
app.use("", authRoute);
app.use("", product);
app.use("", supplier);
app.use("", InStock);
app.use("", OutStock);
app.listen(port, (req, res) => {
  console.log("server lance sur le port", port);
});
