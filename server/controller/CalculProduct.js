const pool = require("../db");

const CalculProduct = async (req, res) => {
  try {
    const [Total] = await pool.execute(
      "SELECT COUNT(DISTINCT categorie) AS TotalCategorie, COUNT(*) AS TotalProduit FROM produit"
    );

    const [LowProduit] = await pool.execute(
      "SELECT COUNT(*) as LowProduit FROM produit WHERE quantiteStock <= seuilApprovisionnement"
    );

    const [FinishedProduit] = await pool.execute(
      "SELECT COUNT(*) as FinishedProduit FROM produit WHERE quantiteStock = 0"
    );
    const [PrixMinMax] = await pool.execute(
      "SELECT MIN(prixAchat) as prixAchatMin , MAX(prixAchat) as prixAchatMax, MIN(prixVente) AS prixVenteMin , MAX(prixVente) as prixVenteMax   FROM produit "
    );

    const data = {
      TotalCategorie: Total[0].TotalCategorie || null,
      TotalProduit: Total[0].TotalProduit || null,
      LowProduit: LowProduit[0].LowProduit || null,
      FinishedProduit: FinishedProduit[0].FinishedProduit || null,
      PrixMinMax: PrixMinMax[0],
    };

    res.status(200).json({ message: "Donnée chargée", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Erreur lors du calcul des statistiques",
    });
  }
};

module.exports = CalculProduct;
