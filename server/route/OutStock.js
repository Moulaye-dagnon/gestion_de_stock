const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const getSortieStock = require("../controller/SortieStock/getSortieStock");
const getSortieStocksDetail = require("../controller/SortieStock/SortieStockDetail");
const AddSortieStock = require("../controller/SortieStock/addSortieStock");
const {
  AddSortieStockValidation,
  validate,
} = require("../Validator/SortieStockValidator");

router.post(
  "/stock/out/add",
  AddSortieStockValidation,
  validate,
  AddSortieStock
);
router.get("/stock/out/all", getSortieStock);
router.get("/stock/out/:id/detail", getSortieStocksDetail);

module.exports = router;
