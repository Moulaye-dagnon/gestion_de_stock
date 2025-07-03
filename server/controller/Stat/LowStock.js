const pool = require("../../db");

const LowStockKPI = async (req, res) => {
  const { limit } = req.query;
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();
    const sql = ` SELECT nom AS produit, quantiteStock
      FROM produit
      WHERE quantiteStock <= seuilApprovisionnement AND quantiteStock > 0`;
    const [LowStock] = limit
      ? await connexion.execute(`${sql} LIMIT ?`, [limit])
      : await connexion.execute(sql);

    await connexion.commit();

    const data = {
      LowStock: LowStock || [],
    };

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Erreur lors du calcul des statistiques des stocks faible",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = LowStockKPI;
