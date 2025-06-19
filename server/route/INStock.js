const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const AddEntreStock = require("../controller/addEntreStock");
const getEntreStocks = require("../controller/getEntreStock");
const getEntreStocksDetail = require("../controller/EntreStockDetail");
const {
  AddEntreStockValidation,
  validate,
} = require("../Validator/EntreStockValidator");
router.get("/stock/in/all", getEntreStocks);
console.log(
  typeof AddEntreStockValidation,
  typeof validate,
  typeof AddEntreStock
);

router.post("/stock/in/add", AddEntreStockValidation, validate, AddEntreStock);
router.get("/stock/in/:id/detail", getEntreStocksDetail);
module.exports = router;
