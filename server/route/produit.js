const router = require("express").Router();
const allProduit = require("../controller/product");
const OneProduit = require("../controller/productDeetail");
const addProduct = require("../controller/addProduct");
const authenticate = require("../middlewares/authenticate");
const UpdateProduct = require("../controller/UpdateProduct");
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
