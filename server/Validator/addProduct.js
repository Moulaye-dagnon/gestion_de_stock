const { param, body, validationResult } = require("express-validator");
const pool = require("../db");
const isValidQantity = require("../utils/isValidQantity");
const addProductValidate = [
  body("nom")
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
    .isInt({ min: 1 })
    .toInt()
    .withMessage("fourisseur doit etre bien fournie"),
  body("categorieId")
    .isInt({ min: 1 })
    .toInt()
    .withMessage("categorie  doit etre bien fournie"),
  body("prixAchat")
    .custom(isValidQantity)
    .withMessage(
      "prix d'achat doit être  entiere ou une demi-unité (ex. : 1, 2.5) "
    ),
  body("prixVente")
    .custom(isValidQantity)
    .withMessage(
      "prix de vente doit être  entiere ou une demi-unité (ex. : 1, 2.5) "
    ),
  body("description")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("description doit être une chaîne non vide"),
  body("quantite").custom(isValidQantity),
  body("seuilApprovisionnement")
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
