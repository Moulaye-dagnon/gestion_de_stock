const router = require("express").Router();

const CalculProduct = require("../controller/CalculProduct");

router.get("/stat/produit", CalculProduct);
module.exports = router;
