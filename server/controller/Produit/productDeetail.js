const pool = require("../../db");
const getOneProduit = async (req, res) => {
  const produitId = req.params.id;
  try {
    const [row] = await pool.execute(
      "SELECT p.nom,p.prixAchat,p.prixVente,p.description,p.quantiteStock,p.seuilApprovisionnement, c.nom as categorie, f.nom as nomfournisseur , f.telephone,f.adresse FROM produit p JOIN categorie c ON p.categorieId = c.id JOIN fournisseur f ON p.fournisseurId = f.id WHERE p.id = ? ",
      [produitId]
    );
    if (row.length == 0)
      return res
        .status(404)
        .json({ message: "Ce id n'existe pas dans la base de donnée" });

    res.status(200).json({ message: "Donnée chargée", data: row[0] });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur", err });
  }
};

module.exports = getOneProduit;
