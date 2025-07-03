const pool = require("../../db");

const TopClient = async (req, res) => {
  const { limit } = req.query;
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();
    const sql = `SELECT C.nom , SUM(S.quantiteSortie * P.prixVente) AS Total_Achat   FROM client C JOIN sortiestock S ON C.id = S.clientId JOIN produit P ON S.produitId = P.id GROUP BY C.nom ORDER BY Total_Achat DESC`;
    const [TopClient] = limit
      ? await connexion.execute(`${sql} LIMIT ?`, [limit])
      : await connexion.execute(sql);

    await connexion.commit();

    const data = {
      TopClient: TopClient || [],
    };

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Erreur lors du calcul des statistiques produits et stocks",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = TopClient;
