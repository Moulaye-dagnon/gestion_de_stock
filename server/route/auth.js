const login = require("../controller/login");
const refresh = require("../controller/refresh");
const register = require("../controller/register");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
