import React from "react";
import useSortieStockDetail from "../../hooks/useSortieStockDetail";
import { useParams } from "react-router";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";

function OutStockDetail() {
  const { sortieStockId } = useParams();

  const { isLoading, isError, error, data } = useSortieStockDetail({
    id: sortieStockId,
  });
  if (isLoading) return <SpinnerComponent />;

  return (
    <div className=" flex-1 flex flex-col m-3 bg-white p-4">
      <div className="flex justify-between items-center ">
        <span className="text-xl text-slate-600 font-bold uppercase">
          Information de sortie
        </span>
      </div>
      <div className=" flex-1 flex flex-col  px-10 py-8">
        <div className="flex flex-col">
          <div>
            <div className="text-lg text-slate-600 font-bold mb-5 ">
              Detail de sortie de produit
            </div>
            <div className="flex flex-col lg:flex-row justify-between">
              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Nom du produit
                  </span>
                  <span className="text-lg text-gray-600">{data.Produit}</span>
                </div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Categorie du produit
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.categorieProduit}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Prix de vente
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.ProduitprixVente}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Qantité sortie
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.quantiteSortie}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Date de sortie
                  </span>
                  <span className="text-lg text-gray-600">
                    {new Date(data.dateSortie).toISOString().split("T")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-10">
              <span className="inline-block text-lg mr-5 text-gray-500">
                Le gestion ayant rentre la livraison
              </span>
              <span className="text-lg text-gray-600">{data.Utilisateur}</span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col"></div>
      </div>
    </div>
  );
}

export default OutStockDetail;
