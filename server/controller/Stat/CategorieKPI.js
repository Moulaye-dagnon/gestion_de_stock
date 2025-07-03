const pool = require("../../db");

const CategorieKPI = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    const [TotalCategorie] = await connexion.execute(`
	  SELECT COUNT(*) AS TotalCategorie	
	  FROM categorie
	`);

    await connexion.commit();
    const data = {
      TotalCategorie: TotalCategorie[0].TotalCategorie || null,
    };

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

module.exports = CategorieKPI;
