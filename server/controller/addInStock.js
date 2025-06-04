const pool = require("../db");

const AddInStock = async (req, res) => {
  const {
    produitId,
    fournisseurId,
    utilisateurId,
    quantitEntre,
    referenceCommandeLivraison,
  } = req.body;


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
      return res.status(401).json({ message: "Ce produit n'existe pas" });
    if (rowFournisseur.length === 0)
      return res.status(401).json({ message: "Ce fournisseur n'existe pas" });
    if (rowUtilisateur.length === 0)
      return res.status(401).json({ message: "Ce utilisateur n'existe pas" });

    await connexion.beginTransaction();
    try {
      await connexion.execute(
        "INSERT INTO `entrestock` (`produitId`, `fournisseurId`, `utilisateurId`, `quantiteEntre`, `referenceCommandeLivraison`) VALUES ( ?, ?, ?, ?, ?)",
        [
          produitId,
          fournisseurId,
          utilisateurId,
          quantitEntre,
          referenceCommandeLivraison,
        ]
      );
      const totalQuantite =
        parseFloat(rowProduit[0].quantiteStock) + quantitEntre;

      await connexion.execute(
        "UPDATE `produit` SET `quantiteStock` = ? WHERE `produit`.`id` = ?",
        [totalQuantite, produitId]
      );
      await connexion.commit();

      res.status(200).json({ message: "stock mis a jour" });
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

module.exports = AddInStock;
