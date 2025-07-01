const pool = require("../../db");
const getMe = async (req, res) => {
  const userid = req.user.id;

  try {
    const [row] = await pool.execute(
      "select id,nom,role,dateCreation from utilisateur where id = ?",
      [userid]
    );
    if (row.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvée" });
    }
    res.json(row[0]);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur:",
      error
    );
    res.status(500).json({ error: "Erreur serveur", error });
  }
};
module.exports = getMe;
