import { useEffect, useState } from "react";
import OverallComponent from "../../components/Overrall/OverallComponent";
import { UseAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import Card from "../../components/Card/Card";
import CardProduit from "../../components/Card/CardProduit";
import TopSellTable from "../../components/TopSellTable/TopSellTable";
import LowStockComponent from "../../components/LowStock/LowStockComponent";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import { formatPrice } from "../../utils/FormatPrice";
import CardTopCategorieComponent from "../../components/Card/CardTopCategorieComponent";
import useStatVente from "../../hooks/Stat/useStatVente";
import useStatProduitStockKPI from "../../hooks/Stat/useStatProduitStockKPI";
import useStatSortieStock from "../../hooks/Stat/useStatEntreFournisseur";
import useStatCategorie from "../../hooks/Stat/useStatCategorie";
import useStatTopCategorie from "../../hooks/Stat/useStatTopCategorie";
import CategorieList from "../../components/Card/CategorieList";

export function Home() {
  const navigate = useNavigate();
  const [OverallTopCaegorie, setOverallTopCategorie] = useState(false);
  const { user, isloading } = UseAuthContext();
  useEffect(() => {
    if ((!isloading && !user) || !user) {
      navigate("/login");
    }
  }, [user, isloading, navigate]);

  const { isLoading: isLoadingStatProduitStock, data: StatProduitStockData } =
    useStatProduitStockKPI();

  const { isLoading: isLoadingStatVente, data: StatVenteData } = useStatVente();
  const { isLoading: isLoadingStatTopCategorie, data: StatTopCategorieData } =
    useStatTopCategorie({ limit: 3 });
  const {
    isLoading: isLoadingStatEntrerFournisseur,
    data: statEntreFournisseur,
  } = useStatSortieStock();
  const { isLoading: isLoadingStatCategorie, data: StatCategorieData } =
    useStatCategorie();
  if (
    isLoadingStatProduitStock ||
    isLoadingStatEntrerFournisseur ||
    isLoadingStatVente ||
    isLoadingStatCategorie ||
    isLoadingStatTopCategorie
  )
    return <SpinnerComponent />;

  return (
    <>
      <div className="flex-1  pb-6 flex flex-col gap-y-2 overflow-auto   w-full">
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-[1fr_300px] gap-2">
            <Card
              title={"Aperçu Stock"}
              name1={"Total Produit"}
              value1={StatProduitStockData?.TotalProduit}
              onclick1={() => navigate("/inventaire")}
              color1={"bg-blue-100"}
              name2={"Valeur du Stock"}
              value2={formatPrice(StatProduitStockData?.ValeurStock) + " f"}
              color2={"bg-green-100"}
              name3={"Produit Faible"}
              value3={StatProduitStockData?.LowStock}
              color3={"bg-orange-100"}
              name4={"Produit Terminé"}
              value4={StatProduitStockData?.FinishedProduct}
              color4={"bg-red-100"}
              total={4}
            />
            <Card
              title={"Résumé des produits"}
              name1={"Fournisseur"}
              onclick1={() => navigate("/fournisseur")}
              value1={statEntreFournisseur?.TotalSupplierActifs}
              name2={"Catégorie"}
              value2={StatCategorieData?.TotalCategorie}
            />
          </div>
          <div className="grid grid-cols-[1fr_400px] gap-2">
            <Card
              title={"Statistique des ventes"}
              name1={"Chiffre d'affaire"}
              value1={formatPrice(StatVenteData?.chiffre_affaires_total) + " f"}
              name2={"Total Vente"}
              value2={StatVenteData?.total_vente}
              onclick2={() => navigate("/stock/sortie")}
              name3={"Valeur moyenne"}
              value3={formatPrice(StatVenteData?.valeur_moyenne) + " f"}
              name4={"Total Client "}
              value4={StatVenteData?.total_client_distinct}
              onclick4={() => navigate("/client")}
              total={4}
            />
            <CardTopCategorieComponent
              data={StatTopCategorieData?.TopCategorie}
              handleOnclick={() => setOverallTopCategorie(true)}
            />
          </div>

          <div className="grid grid-cols-[1fr_300px] gap-2">
            <TopSellTable data={StatVenteData?.TopSeller} />
            <LowStockComponent data={StatProduitStockData?.LowStockList} />
          </div>
        </div>
      </div>
      {OverallTopCaegorie && (
        <CategorieList setOverallTopCategorie={setOverallTopCategorie} />
      )}
    </>
  );
}
