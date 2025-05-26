const login = require("../controller/login");
const refresh = require("../controller/refresh");
const register = require("../controller/register");
const getMe = require("../controller/getMe");
const authenticate = require("../middlewares/authenticate");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);

module.exports = router;
