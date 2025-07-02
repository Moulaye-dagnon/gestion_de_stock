const pool = require("../../db");

const TopCategorieKpi = async (req, res) => {
  const { limit } = req.query;
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();
    const sql = `SELECT C.nom AS categorie, SUM(S.quantiteSortie * P.prixVente) AS totalVente
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
      JOIN categorie C ON P.categorieId = C.id
      GROUP BY C.nom
      ORDER BY totalVente DESC`;
    const [TopCategorie] = limit
      ? await connexion.execute(`${sql} LIMIT ?`, [limit])
      : await connexion.execute(sql);

    await connexion.commit();

    const data = {
      TopCategorie: TopCategorie || [],
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

module.exports = TopCategorieKpi;
