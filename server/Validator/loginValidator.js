const { validationResult, body } = require("express-validator");
const addLoginValidator = [
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Email doit etre sous fourmat valide"),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .notEmpty()
    .withMessage("Le mot de passe doit etre minimum 8 "),
];
const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = { addLoginValidator, validateLogin };
