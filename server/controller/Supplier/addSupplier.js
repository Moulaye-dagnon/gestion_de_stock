const pool = require("../../db");

const addSupplier = async (req, res) => {
  const { nom, telephone, adresse } = req.body;

  const connexion = await pool.getConnection();

  try {
    await connexion.execute(
      "INSERT INTO `fournisseur` ( `nom`, `telephone`, `adresse`) VALUES (? , ?, ?)",
      [nom, telephone, adresse]
    );

    res.status(201).json({ message: "Un nouveau fournisseur ajouté" });
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
module.exports = addSupplier;
