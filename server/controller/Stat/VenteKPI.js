const pool = require("../../db");

const VentesKpi = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    // Requête pour VenteKpi
    const [ChiffreAffairesTotal] = await connexion.execute(`
      SELECT SUM(S.quantiteSortie * P.prixVente) AS totalPrixVente
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
    `);
    const [TotalVente] = await connexion.execute(`
      SELECT COUNT(*) AS totalVente
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
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

    // Requête pour SortieKpi
    const [TotalSortieStock] = await connexion.execute(`
      SELECT COUNT(*) AS TotalSortieStock
      FROM sortiestock
    `);

    // Requête pour TopSeller
    const [TopSeller] = await connexion.execute(`
     SELECT 
  P.nom, 
  SUM(S.quantiteSortie) AS Total_quantite_vendu, 
  MAX(P.quantiteStock) AS Total_quantite_stock, 
  MAX(P.prixVente) AS Prix
 FROM produit P
 JOIN sortiestock S ON S.produitId = P.id
 GROUP BY P.nom
 ORDER BY Total_quantite_vendu DESC
  LIMIT 3

    `);

    // Requête pour TopCategorie
    const [TopCategorie] = await connexion.execute(`
      SELECT C.nom AS categorie, SUM(S.quantiteSortie * P.prixVente) AS totalVente
      FROM sortiestock S
      JOIN produit P ON S.produitId = P.id
      JOIN categorie C ON P.categorieId = C.id
      GROUP BY C.nom
      ORDER BY totalVente DESC
      LIMIT 4
    `);

    await connexion.commit();

    const data = {
      chiffre_affaires_total: ChiffreAffairesTotal[0].totalPrixVente || null,
      total_vente: TotalVente[0].totalVente || 0,
      valeur_moyenne: ValeurMoyenne[0].valeurMoyenne || null,
      total_client_distinct: TotalClientDistinct[0].totalClientDistinct || 0,
      TotalSortieStock: TotalSortieStock[0].TotalSortieStock || null,
      TopSeller: TopSeller || [],
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
      messageError: "Erreur lors du calcul des statistiques ventes",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = VentesKpi;
