import React from "react";
import useSupplierDetail from "../../hooks/useSupplierDetail";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import { useParams } from "react-router";
import { FiEdit2 } from "react-icons/fi";

function SupplierDetail() {
  const { fournisseurId } = useParams();

  const { isLoading, data } = useSupplierDetail({ id: fournisseurId });

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <div className={`flex-1  flex flex-col m-3 bg-white p-4`}>
        <div className="flex justify-between items-center ">
          <span className="text-xl font-bold"> {data.nom}</span>
          <button
            // onClick={() => setHideUpdateComponent((c) => true)}
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
              <div className="text-xl font-bold mb-5 ">
                Detail du fournisseur
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Nom du fournisseur
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.fournisseur.nom}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Adresse du fournisseur
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.fournisseur.adresse}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Téléphone
                    </span>
                    <span className="text-lg text-gray-600">
                      {data.fournisseur.telephone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-10">
                    <span className="inline-block text-lg mr-5 text-gray-500">
                      Fournisseur depuis
                    </span>
                    <span className="text-lg text-gray-600">
                      {
                        new Date(data.fournisseur.dateAjout)
                          .toISOString()
                          .split("T")[0]
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold mb-5 ">
                Les produits que {data.fournisseur.nom} vous fournit
              </div>

              <div>
                {data.produit.length > 0 && (
                  <table className="min-w-full divide-y border-collapse  divide-gray-200">
                    <thead className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                        Nom du produit
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                        Categorie
                      </th>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.produit.map((item) => (
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {item.nom}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            {item.categorie}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <div className=" flex flex-col"></div>
        </div>
      </div>
    </>
  );
}

export default SupplierDetail;
