const pool = require("../db");
const getAllProducts = async (req, res) => {
  try {
    const [row] = await pool.execute(
      "select p.id,p.nom,c.nom as categorie,p.prixAchat,p.prixVente ,p.quantiteStock,p.seuilApprovisionnement  from produit p JOIN categorie c ON p.categorieId = c.id  ORDER BY id DESC"
    );
    if (row.length == 0)
      return res.status(404).json({ message: "La table produits est vide" });

    res.status(200).json({ message: "Donnée chargée", data: row });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", err });
  }
};

module.exports = getAllProducts;
