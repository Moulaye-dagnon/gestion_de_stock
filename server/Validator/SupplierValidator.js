const { body, validationResult } = require("express-validator");

const addSupplierValidation = [
  body("nom")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Nom doit être une chaîne non vide"),
  body("telephone")
    .matches(/^\+223\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/)
    .withMessage(
      "Téléphone doit être un numéro valide de type +223 XX XX XX XX"
    ),
  body("adresse")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("adresse doit être une chaîne non vide"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = {
  addSupplierValidation,
  validate,
};
