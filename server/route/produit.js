const router = require("express").Router();
const allProduit = require("../controller/Produit/product");
const OneProduit = require("../controller/Produit/productDeetail");
const addProduct = require("../controller/Produit/addProduct");
const authenticate = require("../middlewares/authenticate");
const UpdateProduct = require("../controller/Produit/UpdateProduct");
const {
  UpdateProductValidate,
  validateUpdate,
} = require("../Validator/UpdateProductValidator");
const {
  addProductValidate,
  validateProduct,
} = require("..//Validator/addProduct");
router.get("/produit/all", authenticate, allProduit);
router.get("/produit/:id", authenticate, OneProduit);
router.post(
  "/produit/new",
  authenticate,
  addProductValidate,
  validateProduct,
  addProduct
);

router.put(
  "/produit/:id/update",
  authenticate,
  UpdateProductValidate,
  validateUpdate,
  UpdateProduct
);

module.exports = router;
