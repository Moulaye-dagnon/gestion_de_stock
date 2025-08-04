import { useState } from "react";
import { useNavigate } from "react-router";
import { UseAuthContext } from "../../Context/AuthContext";

import { formatPrice } from "../../utils/FormatPrice";
import useStatVente from "../../hooks/Stat/useStatVente";
import useStatProduitStockKPI from "../../hooks/Stat/useStatProduitStockKPI";
import useStatSortieStock from "../../hooks/Stat/useStatEntreFournisseur";
import useStatCategorie from "../../hooks/Stat/useStatCategorie";
import useStatTopCategorie from "../../hooks/Stat/useStatTopCategorie";
import useStatTopClient from "../../hooks/Stat/useStatTopClient";
import useStatTopProduitSell from "../../hooks/Stat/useStatTopProduitSell";

import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import Card from "../../components/Card/Card";
import CardTopCategorieComponent from "../../components/Card/CardTopCategorieComponent";
import CardTopClientList from "../../components/Card/CardTopClientList";
import TopSellTable from "../../components/TopSellTable/TopSellTable";
import TopProduitSellAll from "../../components/TopSellTable/TopProduitSellAll";
import LowStockComponent from "../../components/LowStock/LowStockComponent";
import LowStockAllComponent from "../../components/LowStock/LowStockAllComponent";
import CategorieList from "../../components/Card/CategorieList";
import CartTopClient from "../../components/Card/CartTopClient";

export function Home() {
  const navigate = useNavigate();
  //const { user, isloading } = UseAuthContext();

  //   useEffect(() => {
  //     if ((!isloading && !user) || !user) {
  //       navigate("/login");
  //     }
  //   }, [user, isloading, navigate]);

  const [OverallTopCategorie, setOverallTopCategorie] = useState(false);
  const [OverallLowStock, setOverallLowStock] = useState(false);
  const [OverallTopClient, setOverallTopClient] = useState(false);
  const [OverallTopProduitSell, setOverallTopProduitSell] = useState(false);

  const { isLoading: isLoadingStatProduitStock, data: StatProduitStockData } =
    useStatProduitStockKPI();

  const { isLoading: isLoadingStatVente, data: StatVenteData } = useStatVente();
  const { isLoading: isLoadingStatTopCategorie, data: StatTopCategorieData } =
    useStatTopCategorie({ limit: 3 });
  const {
    isLoading: isLoadingStatTopCategorieAll,
    data: StatCategorieTopCategorieDataAll,
  } = useStatTopCategorie();

  const {
    isLoading: isLoadingStatEntrerFournisseur,
    data: statEntreFournisseur,
  } = useStatSortieStock();

  const { isLoading: isLoadingStatCategorie, data: StatCategorieData } =
    useStatCategorie();

  const { isLoading: isLoadingStatTopClient, data: StatTopClientData } =
    useStatTopClient({ limit: 3 });

  const { isLoading: isLoadingStatTopClientAll, data: StatTopClientDataall } =
    useStatTopClient();

  const { isLoading: isLoadingStatTopProduitSell, data: StatTopProduitSell } =
    useStatTopProduitSell({ limit: 3 });

  const {
    isLoading: isLoadingStatTopProduitSellAll,
    data: StatTopProduitSellAll,
  } = useStatTopProduitSell();

  const isLoading =
    isLoadingStatProduitStock ||
    isLoadingStatEntrerFournisseur ||
    isLoadingStatVente ||
    isLoadingStatCategorie ||
    isLoadingStatTopCategorie ||
    isLoadingStatTopCategorieAll ||
    isLoadingStatTopClient ||
    isLoadingStatTopClientAll ||
    isLoadingStatTopProduitSell ||
    isLoadingStatTopProduitSellAll;

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <div className="flex-1 pb-6 flex flex-col gap-y-2 overflow-auto w-full">
        <div className="flex flex-col gap-y-2">
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

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2">
            <Card
              title={"Résumé des produits"}
              name1={"Fournisseur"}
              onclick1={() => navigate("/fournisseur")}
              value1={statEntreFournisseur?.TotalSupplier}
              name2={"Catégorie"}
              value2={StatCategorieData?.TotalCategorie}
            />
            <CardTopCategorieComponent
              data={StatTopCategorieData?.TopCategorie}
              handleOnclick={() => setOverallTopCategorie(true)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2">
            <TopSellTable
              handleOnclick={() => setOverallTopProduitSell(true)}
              data={StatTopProduitSell?.TopProduitSell}
            />
            <LowStockComponent
              handleOnclick={() => setOverallLowStock(true)}
              data={StatProduitStockData?.LowStockList}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-2">
            <CartTopClient
              data={StatTopClientData?.TopClient}
              handleOnclick={() => setOverallTopClient(true)}
            />
          </div>
        </div>
      </div>

      {OverallTopCategorie && (
        <CategorieList
          data={StatCategorieTopCategorieDataAll?.TopCategorie}
          setOverallTopCategorie={setOverallTopCategorie}
        />
      )}
      {OverallLowStock && (
        <LowStockAllComponent setOverallLowStock={setOverallLowStock} />
      )}
      {OverallTopClient && (
        <CardTopClientList
          setOverallTopClient={setOverallTopClient}
          data={StatTopClientDataall?.TopClient}
        />
      )}
      {OverallTopProduitSell && (
        <TopProduitSellAll
          data={StatTopProduitSellAll?.TopProduitSell}
          setOverallTopProduitSell={setOverallTopProduitSell}
        />
      )}
    </>
  );
}
