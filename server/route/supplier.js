const router = require("express").Router();
const getSuppliers = require("../controller/Supplier");

router.get("/suppliers/all", getSuppliers);

module.exports = router;
