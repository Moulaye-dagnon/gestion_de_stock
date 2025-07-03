const pool = require("../../db");

const EntreesFournisseursKpi = async (req, res) => {
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();

    // Requête pour EntreKpi
    const [TotalEntreStock] = await connexion.execute(`
      SELECT COUNT(*) AS TotalEntreStock
      FROM entrestock
    `);

    // Requête pour SupplierKpi
    const [TotalSupplier] = await connexion.execute(`
      SELECT COUNT(*) AS TotalSupplier
      FROM fournisseur 
    `);

    await connexion.commit();

    const data = {
      TotalEntreStock: TotalEntreStock[0].TotalEntreStock || null,
      TotalSupplier: TotalSupplier[0].TotalSupplier || null,
    };

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError:
        "Erreur lors du calcul des statistiques entrées et fournisseurs",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = EntreesFournisseursKpi;
