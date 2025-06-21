const pool = require("../db");

const getSupplierDetail = async (req, res) => {
  const supplierId = parseInt(req.params.id);
  const connexion = await pool.getConnection();

  try {
    const [row] = await connexion.execute(
      "SELECT nom, adresse, telephone, dateAjout FROM fournisseur WHERE id = ?",
      [supplierId]
    );

    if (row.length === 0) {
      return res
        .status(404)
        .json({ message: "La table fournisseur ne contient pas cet ID" });
    }

    const [produitSupplier] = await connexion.execute(
      "SELECT  p.nom, p.categorie FROM produit p JOIN fournisseur f ON p.fournisseurId = f.id WHERE f.id = ?",
      [supplierId]
    );

    const data = {
      fournisseur: row[0],
      produit: produitSupplier,
    };

    res.status(200).json({
      message: "Information du fournisseur chargée",
      data: data,
    });
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

module.exports = getSupplierDetail;
