const login = require("../controller/login");
const refresh = require("../controller/refresh");
const register = require("../controller/register");
const getMe = require("../controller/getMe");
const authenticate = require("../middlewares/authenticate");
const {
  addLoginValidator,
  validateLogin,
} = require("../Validator/loginValidator");
const {
  addRegisteValidator,
  validateRegister,
} = require("../Validator/registerValidator");
const router = require("express").Router();

router.post("/register", addRegisteValidator, validateRegister, register);
router.post("/login", addLoginValidator, validateLogin, login);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);

module.exports = router;
