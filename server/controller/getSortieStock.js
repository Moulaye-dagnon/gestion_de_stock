const pool = require("../db");
const getSortieStock = async (req, res) => {
  try {
    const [row] = await pool.execute(
      "SELECT S.id, P.nom as produit,  S.quantiteSortie , S.dateSortie FROM sortiestock S JOIN produit P ON P.id = S.produitId"
    );
    if (row.length == 0)
      return res.status(404).json({ message: "La table EntréStock est vide" });
    res.status(200).json({ message: "Donnée chargée", data: row });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", error });
  }
};

module.exports = getSortieStock;
