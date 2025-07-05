const pool = require("../../db");

const VentesKpi = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    const [ChiffreAffairesTotal] = await connexion.execute(`
      SELECT SUM(S.quantiteSortie * P.prixVente) AS totalPrixVente
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
    `);
    const [TotalVente] = await connexion.execute(`
      SELECT COUNT(*) AS totalVente
      FROM sortiestock 
    `);
    const [ValeurMoyenne] = await connexion.execute(`
      SELECT AVG(S.quantiteSortie * P.prixVente) AS valeurMoyenne
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
    `);
    const [TotalClientDistinct] = await connexion.execute(`
      SELECT COUNT(DISTINCT S.clientId) AS totalClientDistinct
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
    `);


    await connexion.commit();

    const data = {
      chiffre_affaires_total: ChiffreAffairesTotal[0].totalPrixVente || null,
      total_vente: TotalVente[0].totalVente || 0,
      valeur_moyenne: ValeurMoyenne[0].valeurMoyenne || null,
      total_client_distinct: TotalClientDistinct[0].totalClientDistinct || 0,
    };

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Erreur lors du calcul des statistiques ventes",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = VentesKpi;
