const pool = require("../../db");

const client = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    const [TotalClient] = await connexion.execute(`
	  SELECT COUNT(*) AS TotalClient
	  FROM client
	`);

    await connexion.commit();
    const data = {
      TotalClient: TotalClient[0].TotalClient || null,
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

module.exports = client;
