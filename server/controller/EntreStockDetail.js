const pool = require("../db");

const getEntreStocksDetail = async (req, res) => {
  const entrestockId = req.params.id;
  try {
    const [row] = await pool.execute(
      "SELECT E.dateEntre,E.quantiteEntre, E.referenceCommandeLivraison , P.nom as Produit,P.prixAchat as ProduitPrixAchat , P.categorie as categorieProduit , P.quantiteStock  ,F.nom as Fournisseur , U.nom as Utilisateur FROM entrestock E  JOIN produit P ON E.produitId = P.id   JOIN fournisseur F ON E.fournisseurId = F.id  JOIN utilisateur U ON E.utilisateurId = U.id  WHERE E.id = ?",
      [entrestockId]
    );
    if (row.length == 0)
      return res
        .status(404)
        .json({ message: "La table EntreStock ne contient pas ce id" });

    res
      .status(200)
      .json({ message: "Information d'EntreStock est chargée", data: row[0] });
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ error: "Erreur serveur", error });
  }
};
module.exports = getEntreStocksDetail;
