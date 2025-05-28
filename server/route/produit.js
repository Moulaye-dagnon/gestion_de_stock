const router = require("express").Router();
const allProduit = require("../controller/product");
const OneProduit = require("../controller/productDeetail");
router.get("/produit/all", allProduit);
router.get("/produit/:id", OneProduit);

module.exports = router;
