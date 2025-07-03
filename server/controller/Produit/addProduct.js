const pool = require("../../db");

const addProduct = async (req, res) => {
  const {
    nom,
    fournisseurId,
    categorieId,
    prixAchat,
    prixVente,
    description,
    quantite,
    seuilApprovisionnement,
  } = req.body;

  try {
    const [row] = await pool.execute(
      "INSERT INTO `produit` ( `fournisseurId`, `nom`, `categorieId`, `prixAchat`, `prixVente`, `description`, `quantiteStock`, `seuilApprovisionnement`) VALUES (?,?,?,?,?,?,?,?)",
      [
        fournisseurId,
        nom,
        categorieId,
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
