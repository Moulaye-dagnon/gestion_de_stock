const { param, body, validationResult } = require("express-validator");
const pool = require("../db");
const isValidQantity = require("../utils/isValidQantity");
const addProductValidate = [
  body("nom")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Nom doit être une chaîne non vide")
    .custom(async (value) => {
      const [rows] = await pool.execute(
        "SELECT id FROM produit WHERE nom = ?",
        [value]
      );
      if (rows.length > 0) {
        throw new Error("Un produit avec ce nom existe déjà");
      }
      return true;
    }),
  ,
  body("fournisseurId")
    .optional()
    .isInt({ min: 1 })
    .toInt()
    .withMessage("fourisseurId doit etre un entier positif"),
  body("categorie")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("categorie doit être une chaîne non vide"),
  body("prixAchat")
    .optional()
    .custom(isValidQantity)
    .withMessage(
      "prixAchat doit être  entiere ou une demi-unité (ex. : 1, 2.5) "
    ),
  body("prixVente")
    .optional()
    .custom(isValidQantity)
    .withMessage(
      "prixVente doit être  entiere ou une demi-unité (ex. : 1, 2.5) "
    ),
  body("description")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("description doit être une chaîne non vide"),
  body("quantite").custom(isValidQantity),
  body("seuilApprovisionnement")
    .optional()
    .custom(isValidQantity)
    .withMessage(
      "seuilApprovisionnement doit être entier ou une demi-unité (ex. : 1, 2.5)"
    ),
];

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = {
  addProductValidate,
  validateProduct,
};
