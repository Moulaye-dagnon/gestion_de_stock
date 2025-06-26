const router = require("express").Router();
const authentificate = require("../middlewares/authenticate");
const getClient = require("../controller/getClient");

router.get("/client/all", getClient);

module.exports = router;
