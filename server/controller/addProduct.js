const pool = require("../db");

const addProduct = async (req, res) => {
  const {
    nom,
    fournisseurId,
    categorie,
    prixAchat,
    prixVente,
    description,
    quantite,
    seuilApprovisionnement,
  } = req.body;
  console.log(
    nom,
    fournisseurId,
    categorie,
    prixAchat,
    prixVente,
    description,
    quantite,
    seuilApprovisionnement
  );
  const CategorieUpper = categorie.toUpperCase();
  try {
    const [row] = await pool.execute(
      "INSERT INTO `produit` ( `fournisseurId`, `nom`, `categorie`, `prixAchat`, `prixVente`, `description`, `quantiteStock`, `seuilApprovisionnement`) VALUES (?,?,?,?,?,?,?,?)",
      [
        fournisseurId,
        nom,
        CategorieUpper,
        prixAchat,
        prixVente,
        description,
        quantite,
        seuilApprovisionnement,
      ]
    );
    res.status(201).json({ message: "Un nouveau produit crée" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      error: "Erreur serveur lors de la creation d'un nouveau produit",
    });
  }
};

module.exports = addProduct;
