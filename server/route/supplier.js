const router = require("express").Router();
const getSuppliers = require("../controller/Supplier");
const getSupplierDetail = require("../controller/SupplierDetail");
const {
  validate,
  addSupplierValidation,
} = require("../Validator/SupplierValidator");
const addSupplier = require("../controller/addSupplier");
router.get("/suppliers/all", getSuppliers);

router.get("/supplier/:id/detail", getSupplierDetail);

router.post("/supplier/add", addSupplierValidation, validate, addSupplier);

module.exports = router;
