import React from "react";
import useStatProduit from "../../hooks/useStatProduit";
import SpinnerComponent from "../Spinner/SpinnerComponent";

function OverallComponent({ title = "Inventaire global" }) {
  const { isLoading, data } = useStatProduit();

  if (isLoading) return <SpinnerComponent />;
  const {
    TotalCategorie,
    TotalProduit,
    LowProduit,
    FinishedProduit,
    prixAchatMin,
    prixAchatMax,
    prixVenteMin,
    prixVenteMax,
  } = data;

  // Données pour les cartes
  const stats = [
    { title: "Total Produits", value: TotalProduit },
    { title: "Catégories", value: TotalCategorie },
    { title: "Stock Bas", value: LowProduit },
    { title: "Rupture Stock", value: FinishedProduit },
    { title: "Prix Achat Min", value: prixAchatMin },
    { title: "Prix Achat Max", value: prixAchatMax },
    { title: "Prix Vente Min", value: prixVenteMin },
    { title: "Prix Vente Max", value: prixVenteMax },
  ];

  return (
    <div className="container mx-auto p-2">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1> */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-sm font-semibold text-gray-600 text-center">
              {stat.title}
            </h2>
            <p className="text-lg font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverallComponent;

// <div className=" flex flex-col bg-white rounded-md py-4  px-3 w-full ">
//   <div className="text-my-handing text-xl pb-4">{title}</div>
//   <div className="flex justify-between flex-wrap   items-center">
//     <div className=" flex-none  w-4/5 sm:w-2/5 flex items-center justify-between">
//       <div className="  flex  flex-col items-center gap-y-3">
//         <span className=" text-my-primary text-sm  ">Categories</span>
//         <span className=" text-my-handing text-lg">
//           {data?.TotalCategorie}
//         </span>
//       </div>
//       <div className="  flex  flex-col items-center gap-y-3">
//         <span className=" text-my-primary text-sm  ">Produits</span>
//         <span className=" text-my-handing text-lg">
//           {data?.TotalProduit}
//         </span>
//       </div>
//     </div>
//     <div className=" flex-none w-4/5 sm:w-2/5 flex items-center justify-between">
//       <div className="  flex  flex-col items-center justify-between gap-y-3">
//         <span className=" text-my-primary text-sm  ">Faible quantité</span>
//         <span className=" text-my-handing text-lg">{data?.LowProduit}</span>
//       </div>
//       <div className="  flex  flex-col items-center justify-between gap-y-3">
//         <span className=" text-my-primary text-sm  ">Qauntité fini</span>
//         <span className=" text-my-handing text-lg">
//           {data?.FinishedProduit}
//         </span>
//       </div>
//     </div>
//   </div>
// </div>
