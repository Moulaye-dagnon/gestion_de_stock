const pool = require("../db");
const gettSuppliers = async (req, res) => {
  try {
    const [row] = await pool.execute(
      "select id,nom,telephone,adresse from fournisseur "
    );
    if (row.length == 0)
      return res.status(404).json({ message: "La table fournisseur est vide" });

    res.status(200).json({ message: "Donnée chargée", data: row });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", err });
  }
};
module.exports = gettSuppliers;
