const login = require("../controller/Auth/login");
const refresh = require("../controller/Auth/refresh");
const register = require("../controller/Auth/register");
const getMe = require("../controller/Auth/getMe");
const logout = require("../controller/Auth/logout");
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
router.post("/logout", authenticate, logout);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);

module.exports = router;
