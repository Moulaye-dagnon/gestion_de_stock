const pool = require("../../db");

const getEntreStocks = async (req, res) => {
  try {
    const [row] = await pool.execute(
      " SELECT E.id, P.nom as produit, F.nom as fournisseur, E.quantiteEntre , E.dateEntre FROM entrestock E JOIN produit P ON P.id = E.produitId JOIN fournisseur F ON F.id = E.fournisseurId ORDER BY id DESC"
    );
    if (row.length == 0)
      return res.status(404).json({ message: "La table EntréStock est vide" });
    res.status(200).json({ message: "Donnée chargé", data: row });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", error });
  }
};
module.exports = getEntreStocks;
