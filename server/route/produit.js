const router = require("express").Router();
const allProduit = require("../controller/product");
const OneProduit = require("../controller/productDeetail");
const addProduct = require("../controller/addProduct");
const authenticate = require("../middlewares/authenticate");
const UpdateProduct = require("../controller/UpdateProduct");
const {
  UpdateProductValidate,
  validate,
} = require("../Validator/UpdateProductValidator");
router.get("/produit/all", authenticate, allProduit);
router.get("/produit/:id", authenticate, OneProduit);
router.post("/produit/new", authenticate, addProduct);
console.log(
  typeof authenticate,
  typeof UpdateProductValidate,
  typeof validate,
  typeof UpdateProduct
);

router.put(
  "/produit/:id/update",
  authenticate,
  UpdateProductValidate,
  validate,
  UpdateProduct
);

module.exports = router;
