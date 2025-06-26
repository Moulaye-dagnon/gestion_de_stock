const pool = require("../db");
const getClient = async (req, res) => {
  try {
    const [row] = await pool.execute("select * from client");
    if (row.length == 0) {
      res.status(404).json({ message: "La table client est vide " });
    }
    res.status(200).json({ message: "Donnée chargée ", data: row });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", err });
  }
};

module.exports = getClient;
