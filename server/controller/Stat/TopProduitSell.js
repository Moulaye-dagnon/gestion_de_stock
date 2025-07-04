const pool = require("../../db");

const TopProduitSellKPI = async (req, res) => {
  const { limit } = req.query;
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();
    const sql = `
     SELECT P.nom,  SUM(S.quantiteSortie) AS Total_quantite_vendu, MAX(P.quantiteStock) AS Total_quantite_stock, MAX(P.prixVente) AS Prix FROM produit P JOIN sortiestock S ON S.produitId = P.id GROUP BY P.nom ORDER BY Total_quantite_vendu DESC
`;
    const [TopProduitSell] = limit
      ? await connexion.execute(`${sql} LIMIT ?`, [limit])
      : await connexion.execute(sql);

    await connexion.commit();

    const data = {
      TopProduitSell: TopProduitSell || [],
    };

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError:
        "Erreur lors du calcul des statistiques du Top Produit Sell",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = TopProduitSellKPI;
