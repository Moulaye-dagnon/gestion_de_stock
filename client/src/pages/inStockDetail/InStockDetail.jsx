import React from "react";
import { useParams } from "react-router";
import useEntreStockDtail from "../../hooks/useEntreStockDtail";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import { FiEdit2 } from "react-icons/fi";

function InStockDetail() {
  const { entreStockId } = useParams();

  const { isLoading, isError, error, data } = useEntreStockDtail({
    id: entreStockId,
  });

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className=" flex-1 flex flex-col m-3 bg-white p-4">
      <div className="flex justify-between items-center ">
        <span className="text-xl text-slate-600 font-bold uppercase">
          Information d'entrée
        </span>
     
      </div>
      <div className=" flex-1 flex flex-col  px-10 py-8">
        <div className="flex flex-col">
          <div>
            <div className="text-lg text-slate-600 font-bold mb-5 ">
              Detail de l'entré du produit
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
                    Prix d'achat
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.ProduitPrixAchat}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Qantité entrée
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.quantiteEntre}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Reference de la commande
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.referenceCommandeLivraison}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Date d'entre du produit
                  </span>
                  <span className="text-lg text-gray-600">
                    {new Date(data.dateEntre).toISOString().split("T")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg text-slate-600 font-bold mb-5 ">
              Detail du fournisseur
            </div>
            <div>
              <div className="flex justify-between items-center mb-10">
                <span className="inline-block text-lg mr-5 text-gray-500">
                  Nom du fournisseur
                </span>
                <span className="text-lg text-gray-600">
                  {data.Fournisseur}
                </span>
              </div>
              <div className="flex justify-between items-center mb-10">
                <span className="inline-block text-lg mr-5 text-gray-500">
                  Le gestion ayant rentre la livraison
                </span>
                <span className="text-lg text-gray-600">
                  {data.Utilisateur}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col"></div>
      </div>
    </div>
  );
}

export default InStockDetail;
