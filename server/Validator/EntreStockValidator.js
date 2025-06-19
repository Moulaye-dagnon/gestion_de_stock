const { body, validationResult } = require("express-validator");

const isValidQantity = require("../utils/isValidQantity");

const AddEntreStockValidation = [
  body("produitId")
    .isInt({ min: 1 })
    .withMessage("produitId doit etre un entier positif "),
  body("fournisseurId")
    .isInt({ min: 1 })
    .withMessage("fourisseurId doit etre un entier positif"),
  body("utilisateurId")
    .isInt({ min: 1 })
    .withMessage("utilisateurId doit etre un entier positif"),
  body("quantiteEntre").custom(isValidQantity),
  body("referenceCommandeLivraison")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("referenceCommandeLivraison doit être une chaîne non vide"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = {
  AddEntreStockValidation,
  validate,
};
