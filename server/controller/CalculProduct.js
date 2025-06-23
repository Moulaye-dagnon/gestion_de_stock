const pool = require("../db");

const CalculProduct = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    const [stats] = await connexion.execute(`
      SELECT 
        COUNT(DISTINCT categorie) AS TotalCategorie,
        COUNT(*) AS TotalProduit,
        SUM(quantiteStock <= seuilApprovisionnement) AS LowProduit,
        SUM(quantiteStock = 0) AS FinishedProduit,
        MIN(prixAchat) AS prixAchatMin,
        MAX(prixAchat) AS prixAchatMax,
        MIN(prixVente) AS prixVenteMin,
        MAX(prixVente) AS prixVenteMax,
		SUM(quantiteStock * prixAchat) AS ValeurStock
      FROM produit
    `);

    const data = {
      TotalCategorie: stats[0].TotalCategorie || null,
      TotalProduit: stats[0].TotalProduit || null,
      LowProduit: stats[0].LowProduit || null,
      FinishedProduit: stats[0].FinishedProduit || null,
      prixAchatMin: stats[0].prixAchatMin || null,
      prixAchatMax: stats[0].prixAchatMax || null,
      prixVenteMin: stats[0].prixVenteMin || null,
      prixVenteMax: stats[0].prixVenteMax || null,
      ValeurStock: stats[0].ValeurStock || null,
    };

    await connexion.commit();

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Erreur lors du calcul des statistiques",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = CalculProduct;
