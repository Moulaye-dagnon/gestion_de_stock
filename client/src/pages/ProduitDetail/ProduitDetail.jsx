import React, { useState } from "react";
import { useParams } from "react-router";
import useProduitDetail from "../../hooks/useProduitDetail";
import { FiEdit2 } from "react-icons/fi";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import UpdateProduit from "../../components/UpdateProduit/UpdateProduit";

function ProduitDetail() {
  const { produitId } = useParams();

  const [HideUpdateComponent, setHideUpdateComponent] = useState(false);
  const { isLoading, error, data } = useProduitDetail({ id: produitId });
  if (isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <div
        className={`flex-1 ${
          HideUpdateComponent ? "overflow-hidden" : ""
        }   flex flex-col m-3 bg-white p-4`}
      >
        <div className="flex justify-between items-center ">
          <span className="text-xl font-bold"> {data.nom}</span>
          <button
            onClick={() => setHideUpdateComponent((c) => true)}
            className="border-2 hover:text-my-border hover:bg-my-primary hover:border-my-primary rounded-sm text border-my-border py-2.5 px-4 flex items-center"
          >
            <span className="w-4 mr-3">
              <FiEdit2 />
            </span>
            <span> Modifier</span>
          </button>
        </div>
        <div className=" flex-1 flex flex-col  px-10 py-8">
          <div className="flex flex-col">
            <div>
              <div className="text-xl font-bold mb-5 ">Detail du produit</div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Nom du produit
                    </span>
                    <span className="text-lg text-gray-600">{data.nom}</span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Categorie du produit
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.categorie}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Prix de vente
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.prixVente}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Prix d'achat
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.prixAchat}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Description
                    </span>
                    <span className="text-lg text-gray-600 max-w-sm ">
                      {data.description}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Qantité total dans le stock
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.quantiteStock}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Sueil d'approvisionnement
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.seuilApprovisionnement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold mb-5 ">
                Detail du fournisseur
              </div>

              <div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Nom du fournisseur
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.nomfournisseur}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    adresse du fournisseur
                  </span>
                  <span className="text-lg text-gray-600">{data.adresse}</span>
                </div>
                <div className="flex justify-between items-center mb-10">
                  <span className="inline-block text-lg mr-5 text-gray-500">
                    Téléphone du fournisseur
                  </span>
                  <span className="text-lg text-gray-600">
                    {data.telephone}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col"></div>
        </div>
      </div>
      {HideUpdateComponent && (
        <UpdateProduit setHideUpdateComponent={setHideUpdateComponent} />
      )}
    </>
  );
}
export default ProduitDetail;
