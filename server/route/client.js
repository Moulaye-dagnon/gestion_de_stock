const router = require("express").Router();
const authentificate = require("../middlewares/authenticate");
const getClient = require("../controller/CClient/getClient");
const addClient = require("../controller/CClient/addClient");
const {
  addSupplierValidation,
  validate,
} = require("../Validator/SupplierValidator");
router.get("/client/all", authentificate, getClient);
router.post("/client/add", addSupplierValidation, validate, addClient);

module.exports = router;
