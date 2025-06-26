const router = require("express").Router();
const authentificate = require("../middlewares/authenticate");
const getCategorie = require("../controller/getCategorie");

router.get("/categorie/all", getCategorie);

module.exports = router;
