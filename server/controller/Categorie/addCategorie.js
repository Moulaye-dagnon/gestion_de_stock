const pool = require("../../db");

const addCategorie = async (req, res) => {
  const { nom, description } = req.body;

  const connexion = await pool.getConnection();

  try {
    const [row] = await connexion.execute(
      "INSERT INTO `categorie` ( `nom`, `description`) VALUES (?, ?)",
      [nom, description || null]
    );
    res.status(201).json({ message: "Nouvelle categorie crée" });
  } catch (error) {
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Problème lors du traitement des données",
    });
  } finally {
    connexion.release();
  }
};

module.exports = addCategorie;
