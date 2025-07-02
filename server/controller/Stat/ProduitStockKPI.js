const pool = require("../../db");

const ProduitStockKpi = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    // Requête pour ProduitKpi
    const [ValeurStock] = await connexion.execute(`
      SELECT SUM(quantiteStock * prixAchat) AS ValeurStock
      FROM produit
    `);
    const [LowStockCount] = await connexion.execute(`
      SELECT COUNT(*) AS LowStock
      FROM produit
      WHERE quantiteStock <= seuilApprovisionnement AND quantiteStock > 0
    `);
    const [FinishedProduct] = await connexion.execute(`
      SELECT COUNT(*) AS FinishedProduct
      FROM produit
      WHERE quantiteStock = 0
    `);
    const [TotalProduit] = await connexion.execute(`
      SELECT COUNT(*) AS TotalProduit
      FROM produit
    `);

    // Requête pour LowStock
    const [LowStockList] = await connexion.execute(`
      SELECT nom AS produit, quantiteStock
      FROM produit
      WHERE quantiteStock <= seuilApprovisionnement AND quantiteStock > 0
      LIMIT 3
    `);

    await connexion.commit();

    const data = {
      ValeurStock: ValeurStock[0].ValeurStock || null,
      LowStock: LowStockCount[0].LowStock || null,
      FinishedProduct: FinishedProduct[0].FinishedProduct || null,
      TotalProduit: TotalProduit[0].TotalProduit || null,
      LowStockList: LowStockList || [],
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

module.exports = ProduitStockKpi;
