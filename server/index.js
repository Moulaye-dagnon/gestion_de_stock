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
	  "https://mystock-production-2e5a.up.railway.app"
    ],
    credentials: true,
  })
);

app.use(coockieParser());
const port = process.env.PORT || 3000;
const authRoute = require("./route/auth");
const product = require("./route/produit");
const supplier = require("./route/supplier");
const InStock = require("./route/INStock");
const OutStock = require("./route/OutStock");
const Statistiques = require("./route/Stat");
app.use("", authRoute);
app.use("", product);
app.use("", supplier);
app.use("", InStock);
app.use("", OutStock);
app.use("", Statistiques);
app.listen(port, (req, res) => {
  console.log("server lance sur le port", port);
});
