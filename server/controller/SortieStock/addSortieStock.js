const pool = require("../../db");
const normalizeQuantity = require("../../utils/NormalizeQantity");

const AddSortieStock = async (req, res) => {
  const { utilisateurId, produitId, quantiteSortie, clientId, raison } =
    req.body;

  console.log(req.body);

  const connexion = await pool.getConnection();

  try {
    const [rowProduit] = await connexion.execute(
      "SELECT id, quantiteStock FROM produit WHERE id = ?",
      [produitId]
    );
    if (rowProduit.length === 0) {
      return res.status(404).json({ message: "Ce produit n'existe pas" });
    }

    const [rowUtilisateur] = await connexion.execute(
      "SELECT id FROM utilisateur WHERE id = ?",
      [utilisateurId]
    );
    if (rowUtilisateur.length === 0) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas" });
    }

    const quantiteStockNormalized = normalizeQuantity(
      rowProduit[0].quantiteStock
    );
    const quantiteSortieNormalized = normalizeQuantity(quantiteSortie);

    if (
      parseFloat(quantiteStockNormalized) < parseFloat(quantiteSortieNormalized)
    ) {
      return res.status(400).json({
        message:
          "Vous n'avez pas assez de quantité nécessaire pour cette opération",
      });
    }

    await connexion.beginTransaction();
    try {
      await connexion.execute(
        "INSERT INTO `sortiestock` (`produitId`, `utilisateurId`,`clientId`,`quantiteSortie`, `raison`) VALUES (?, ?,?, ?, ?)",
        [
          produitId,
          utilisateurId,
          clientId,
          quantiteSortieNormalized,
          raison || null,
        ]
      );

      const totalQuantite = (
        parseFloat(quantiteStockNormalized) -
        parseFloat(quantiteSortieNormalized)
      ).toFixed(2);

      const [updateResult] = await connexion.execute(
        "UPDATE `produit` SET `quantiteStock` = ? WHERE `id` = ?",
        [totalQuantite, produitId]
      );
      if (updateResult.affectedRows === 0) {
        throw new Error("Échec de la mise à jour du stock");
      }

      await connexion.commit();

      res.status(200).json({
        message: "Stock mis à jour",
      });
    } catch (error) {
      await connexion.rollback();
      res.status(500).json({
        error: "Échec de la transaction",
        messageError: error.message,
      });
    }
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
module.exports = AddSortieStock;
