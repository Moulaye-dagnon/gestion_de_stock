const router = require("express").Router();
const getSuppliers = require("../controller/Supplier/Supplier");
const getSupplierDetail = require("../controller/Supplier/SupplierDetail");
const addSupplier = require("../controller/Supplier/addSupplier");
const {
  validate,
  addSupplierValidation,
} = require("../Validator/SupplierValidator");
router.get("/suppliers/all", getSuppliers);

router.get("/supplier/:id/detail", getSupplierDetail);

router.post("/supplier/add", addSupplierValidation, validate, addSupplier);

module.exports = router;
