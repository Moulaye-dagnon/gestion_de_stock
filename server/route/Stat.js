const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

const StatCategorie = require("../controller/Stat/CategorieKPI");
const StatCClient = require("../controller/Stat/CClientKPI");
const StatProduitStockKPI = require("../controller/Stat/ProduitStockKPI");
const StatVenteKPI = require("../controller/Stat/VenteKPI");
const StatEntrefournisseurKPI = require("../controller/Stat/EntreFournisseurKPI");

router.get("/stat/produit-stock", StatProduitStockKPI);
router.get("/stat/vente-kpi", StatVenteKPI);
router.get("/stat/entre-fournisseur", StatEntrefournisseurKPI);
router.get("/stat/categorie", StatCategorie);
router.get("/stat/client", StatCClient);

module.exports = router;
