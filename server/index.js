require("dotenv").config();
const express = require("express");
const coockieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gestion-de-stock-ten.vercel.app",
    ],
    credentials: true,
  })
);

app.use(coockieParser());
const port = process.env.PORT || 4000;
const authRoute = require("./route/auth");
const product = require("./route/produit");
const supplier = require("./route/supplier");
const InStock = require("./route/INStock");
const OutStock = require("./route/OutStock");
const Statistiques = require("./route/Stat");
const categorie = require("./route/Categorie");
const client = require("./route/client");

app.use("", authRoute);
app.use("", product);
app.use("", supplier);
app.use("", InStock);
app.use("", OutStock);
app.use("", Statistiques);
app.use("", categorie);
app.use("", client);

app.get("/uptime", (req, res) => {
  console.log("just keep server on");
});
app.listen(port, (req, res) => {
  console.log("server lance sur le port", port);
});
