const pool = require("../../db");
const normalizeQuantity = require("../../utils/NormalizeQantity");

const UpdateProduct = async (req, res) => {
  const produitId = req.params.id;
  const {
    nom,
    fournisseurId,
    categorieId,
    prixAchat,
    prixVente,
    description,
    seuilApprovisionnement,
  } = req.body;
  const connexion = await pool.getConnection();

  try {
    const [rowProduit] = await connexion.execute(
      "SELECT id FROM produit WHERE id = ?",
      [produitId]
    );
    if (rowProduit.length === 0) {
      return res.status(404).json({ message: "Ce produit n'existe pas" });
    }

    if (fournisseurId !== undefined) {
      const [rowFournisseur] = await connexion.execute(
        "SELECT id FROM fournisseur WHERE id = ?",
        [fournisseurId]
      );
      if (rowFournisseur.length === 0) {
        return res.status(404).json({ message: "Ce fournisseur n'existe pas" });
      }
    }

    const normalizedFields = {
      prixAchat:
        prixAchat !== undefined ? normalizeQuantity(prixAchat) : undefined,
      prixVente:
        prixVente !== undefined ? normalizeQuantity(prixVente) : undefined,
      seuilApprovisionnement:
        seuilApprovisionnement !== undefined
          ? normalizeQuantity(seuilApprovisionnement)
          : undefined,
    };

    const fieldsToUpdate = [];
    const values = [];

    if (fournisseurId !== undefined) {
      fieldsToUpdate.push("fournisseurId = ?");
      values.push(fournisseurId);
    }
    if (nom !== undefined) {
      fieldsToUpdate.push("nom = ?");
      values.push(nom);
    }
    if (categorieId !== undefined) {
      fieldsToUpdate.push("categorieId = ?");
      values.push(categorieId);
    }
    if (normalizedFields.prixAchat !== undefined) {
      fieldsToUpdate.push("prixAchat = ?");
      values.push(normalizedFields.prixAchat);
    }
    if (normalizedFields.prixVente !== undefined) {
      fieldsToUpdate.push("prixVente = ?");
      values.push(normalizedFields.prixVente);
    }
    if (description !== undefined) {
      fieldsToUpdate.push("description = ?");
      values.push(description);
    }
    if (normalizedFields.seuilApprovisionnement !== undefined) {
      fieldsToUpdate.push("seuilApprovisionnement = ?");
      values.push(normalizedFields.seuilApprovisionnement);
    }

    if (fieldsToUpdate.length === 0) {
      return res
        .status(400)
        .json({ message: "Aucun champ à mettre à jour fourni" });
    }

    values.push(produitId);

    await connexion.beginTransaction();
    try {
      const query = `UPDATE produit SET ${fieldsToUpdate.join(
        ", "
      )} WHERE id = ?`;
      const [updateResult] = await connexion.execute(query, values);

      if (updateResult.affectedRows === 0) {
        throw new Error("Échec de la mise à jour du produit");
      }

      await connexion.commit();

      const [produitMisAJour] = await connexion.execute(
        "SELECT id, fournisseurId, nom, categorieId, prixAchat, prixVente, description, seuilApprovisionnement, quantiteStock FROM produit WHERE id = ?",
        [produitId]
      );

      res.status(200).json({
        message: "Produit mis à jour",
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
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Problème lors du traitement des données",
    });
  } finally {
    connexion.release();
  }
};

module.exports = UpdateProduct;
