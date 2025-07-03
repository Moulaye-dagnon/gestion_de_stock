const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");

const StatCategorie = require("../controller/Stat/CategorieKPI");
const StatCClient = require("../controller/Stat/CClientKPI");
const StatProduitStockKPI = require("../controller/Stat/ProduitStockKPI");
const StatVenteKPI = require("../controller/Stat/VenteKPI");
const StatEntrefournisseurKPI = require("../controller/Stat/EntreFournisseurKPI");
const TopCategorieKpi = require("../controller/Stat/TopCategorie");
const LowStockKPI = require("../controller/Stat/LowStock");
const TopClient = require("../controller/Stat/TopClient");
router.get("/stat/produit-stock", authenticate, StatProduitStockKPI);
router.get("/stat/vente-kpi", StatVenteKPI);
router.get("/stat/entre-fournisseur", authenticate, StatEntrefournisseurKPI);
router.get("/stat/categorie", authenticate, StatCategorie);
router.get("/stat/client", authenticate, StatCClient);
router.get("/stat/top-categorie", authenticate, TopCategorieKpi);
router.get("/stat/low-stock", authenticate, LowStockKPI);
router.get("/stat/top-client", TopClient);

module.exports = router;
