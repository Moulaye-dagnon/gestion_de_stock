const router = require("express").Router();
const authentificate = require("../middlewares/authenticate");
const getCategorie = require("../controller/Categorie/getCategorie");
const addCategorie = require("../controller/Categorie/addCategorie");
const {
  addCategorieValidator,
  validateCategorie,
} = require("../Validator/addCategorie");
router.get("/categorie/all", getCategorie);
router.post(
  "/categorie/add",
  addCategorieValidator,
  validateCategorie,
  addCategorie
);
module.exports = router;
