const pool = require("../db");

const CalculProduct = async (req, res) => {
  try {
    const [Total] = pool.execute(
      "SELECT COUNT(DISTINCT categorie) as TotalCategorie,  COUNT(*) as TotalProduit FROM produitSELECT  COUNT(DISTINCT categorie) FROM produit"
    );
    console.log(Total);
    const [LowProduit] = pool.execute(
      "SELECT COUNT(*) as LowProduit FROM produit WHERE quantiteStock <= seuilApprovisionnement"
    );
    const [FinishedProduit] = pool.execute(
      "SELECT COUNT(*) as FinishedProduit FROM produit WHERE quantiteStock = 0"
    );
    const data = {
      TotalCategorie: Total[0].TotalCategorie,
      TotalProduit: Total[0].TotalProduit,
      LowProduit: Total[0].LowProduit,
      FinishedProduit: Total[0].FinishedProduit,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "erreur lors du calcul des statistique",
    });
  }
};

module.exports = CalculProduct;
