const pool = require("../../db");
const getCategorie = async (req, res) => {
  try {
    const [row] = await pool.execute("select * from categorie");
    if (row.length == 0) {
      res.status(404).json({ message: "La table categorie est vide " });
    }
    res.status(200).json({ message: "Donnée chargée ", data: row });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", err });
  }
};

module.exports = getCategorie;
