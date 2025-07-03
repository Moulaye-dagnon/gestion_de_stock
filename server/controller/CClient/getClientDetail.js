const pool = require("../../db");

const getClientDetail = async (req, res) => {
  const clientId = req.params.clientId;
  let connexion;
  try {
    connexion = await pool.getConnection();
    await connexion.beginTransaction();
    const [client_info] = await connexion.execute(
      ` SELECT nom , telephone, adresse FROM client WHERE id = ? `,
      [clientId]
    );

    const [Total_Achat_client] = await connexion.execute(
      `
	SELECT 
  	C.nom AS Client,
  	S.quantiteSortie AS Quantite,
  	P.nom AS Produit,
  	S.dateSortie AS Date,
  	P.prixVente AS Prix
	FROM client C
	JOIN sortiestock S ON C.id = S.clientId
	JOIN produit P ON S.produitId = P.id
	WHERE C.id = ?
	ORDER BY S.dateSortie DESC`,
      [clientId]
    );

    await connexion.commit();
    const data = {
      Total_Achat_client: Total_Achat_client || [],
      client_info: client_info || null,
    };

    res.status(200).json({ message: "Données chargées", data });
  } catch (error) {
    if (connexion) {
      await connexion.rollback();
    }
    console.error("Erreur SQL:", error);
    res.status(500).json({
      error: "Erreur serveur",
      messageError: "Erreur lors du chargement des ifi client",
    });
  } finally {
    if (connexion) {
      connexion.release();
    }
  }
};

module.exports = getClientDetail;
