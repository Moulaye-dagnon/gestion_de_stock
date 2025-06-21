const pool = require("../db");
const getStockStocksDetail = async (req, res) => {
  const sortieStockId = req.params.id;
  try {
    const [row] = await pool.execute(
      "SELECT S.dateSortie  , S.quantiteSortie, S.raison ,  P.nom as Produit,P.prixVente as ProduitprixVente , P.categorie as categorieProduit , U.nom as Utilisateur   FROM sortiestock S  JOIN produit P ON S.produitId = P.id   JOIN utilisateur U ON S.utilisateurId = U.id WHERE S.id = ? ",
      [sortieStockId]
    );

    if (row.length == 0)
      return res
        .status(404)
        .json({ message: "La table SortieStock ne contient pas ce id" });
    res
      .status(200)
      .json({ message: "Information de sortieStock chargée ", data: row[0] });
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ error: "Erreur serveur", error });
  }
};

module.exports = getStockStocksDetail;
