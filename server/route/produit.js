const router = require("express").Router();
const allProduit = require("../controller/product");
const OneProduit = require("../controller/productDeetail");
const addProduct = require("../controller/addProduct");
const calculProduct = require("../controller/CalculProduct");
const authenticate = require("../middlewares/authenticate");
router.get("/produit/all", authenticate, allProduit);
router.get("/produit/:id", authenticate, OneProduit);
router.post("/produit/new", authenticate, addProduct);

router.get("/produit/stat", calculProduct);

module.exports = router;
