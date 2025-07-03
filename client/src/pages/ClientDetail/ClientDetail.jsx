import React from "react";
import useClientDetail from "../../hooks/useClientDetail";
import { useParams } from "react-router";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import { formatPrice } from "../../utils/FormatPrice";

function ClientDetail() {
  const { clientId } = useParams();
  const { isLoading, data } = useClientDetail({ clientId: clientId });
  if (isLoading) return <SpinnerComponent />;
  const info_client = data.client_info[0];
  const total_Achat_client = data.Total_Achat_client;

  console.log(total_Achat_client);

  return (
    <div className=" flex-1 flex flex-col m-3 bg-white p-4">
      <div className="flex justify-between items-center ">
        <span className="text-xl text-slate-600 font-bold uppercase">
          Information d'entrée
        </span>
      </div>
      <div className=" flex-1 flex flex-col  px-10 py-8">
        <div>
          <div className="text-lg text-slate-600 font-bold mb-5 ">
            Info du client
          </div>
          <div className="flex flex-col  justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="inline-block text-lg mr-5 text-gray-500">
                  Nom du client
                </span>
                <span className="text-lg text-gray-600">{info_client.nom}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="inline-block text-lg mr-5 text-gray-500">
                  Adresse du client
                </span>
                <span className="text-lg text-gray-600">
                  {info_client.adresse}
                </span>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="inline-block text-lg mr-5 text-gray-500">
                  Numéro de téléphone
                </span>
                <span className="text-lg text-gray-600">
                  {info_client.telephone}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-lg text-slate-600 font-bold mb-5 ">
            Historique d'achat
          </div>
          <table className="w-full overflow-y-auto ">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                  Produit
                </td>
                <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                  Quantite
                </td>
                <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                  Prix Unitaire
                </td>
                <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                  Date
                </td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {total_Achat_client?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {item?.Produit}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {item?.Quantite}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatPrice(item?.Prix) + " fcfa"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item?.Date).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
