const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const AddInStock = require("../controller/addInStock");

router.post("/instock/add", AddInStock);

module.exports = router;
