const { param, body, validationResult } = require("express-validator");

const addCategorieValidator = [
  body("nom")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("le nom doit être une chaîne non vide"),
  body("description")
    .optional()
    .isString()
    .trim()
    .withMessage("description doit être une chaîne "),
];
const validateCategorie = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = {
  addCategorieValidator,
  validateCategorie,
};
