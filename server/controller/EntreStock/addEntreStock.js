const pool = require("../../db");
const normalizeQuantity = require("../../utils/NormalizeQantity");
const AddEntreStock = async (req, res) => {
  const {
    produitId,
    fournisseurId,
    utilisateurId,
    quantiteEntre,
    referenceCommandeLivraison,
  } = req.body;
  const referenceCommandeLivraisonUpper =
    referenceCommandeLivraison.toUpperCase();
  const connexion = await pool.getConnection();
  try {
    const [rowProduit] = await connexion.execute(
      "select id, quantiteStock from produit where id = ?",
      [produitId]
    );
    const [rowFournisseur] = await connexion.execute(
      "select id from fournisseur where id =  ?",
      [fournisseurId]
    );
    const [rowUtilisateur] = await connexion.execute(
      "select id from utilisateur where id = ?",
      [utilisateurId]
    );
    if (rowProduit.length === 0)
      return res.status(404).json({ message: "Ce produit n'existe pas" });
    if (rowFournisseur.length === 0)
      return res.status(404).json({ message: "Ce fournisseur n'existe pas" });
    if (rowUtilisateur.length === 0)
      return res.status(404).json({ message: "Ce utilisateur n'existe pas" });

    const quantiteStockNormalized = normalizeQuantity(
      rowProduit[0].quantiteStock
    );
    const quantiteEntreNormalized = normalizeQuantity(quantiteEntre);
    await connexion.beginTransaction();
    try {
      await connexion.execute(
        "INSERT INTO `entrestock` (`produitId`, `fournisseurId`, `utilisateurId`, `quantiteEntre`, `referenceCommandeLivraison`) VALUES ( ?, ?, ?, ?, ?)",
        [
          produitId,
          fournisseurId,
          utilisateurId,
          quantiteEntreNormalized,
          referenceCommandeLivraisonUpper,
        ]
      );
      const totalQuantite = (
        parseFloat(quantiteStockNormalized) +
        parseFloat(quantiteEntreNormalized)
      ).toFixed(2);

      const [updateResult] = await connexion.execute(
        "UPDATE `produit` SET `quantiteStock` = ? WHERE `produit`.`id` = ?",
        [totalQuantite, produitId]
      );
      if (updateResult.affectedRows === 0) {
        throw new Error("Échec de la mise à jour du stock");
      }
      await connexion.commit();

      const [produitMisAJour] = await connexion.execute(
        "SELECT id, quantiteStock FROM produit WHERE id = ?",
        [produitId]
      );

      res.status(200).json({
        message: "Stock mis à jour",
        produit: produitMisAJour[0],
      });
    } catch (error) {
      await connexion.rollback();
      res.status(500).json({
        error: "Échec de la transaction",
        messageError: error.message,
      });
    }
  } catch (error) {
    console.error("error sql", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Probleme lors du traitement des donné",
    });
  } finally {
    connexion.release();
  }
};

module.exports = AddEntreStock;
