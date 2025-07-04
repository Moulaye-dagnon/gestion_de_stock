import React from "react";
import { formatPrice } from "../../utils/FormatPrice";
import { IoMdClose } from "react-icons/io";

function TopProduitSellAll({ data, setOverallTopProduitSell }) {
  return (
    <div className=" absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-40 ">
      <span
        onClick={() => setOverallTopProduitSell(false)}
        className=" cursor-pointer transition-all hover:scale-90 w-15 absolute top-2.5 right-2.5"
      >
        <IoMdClose size={"100%"} />
      </span>
      <div className="bg-white rounded-sm max-h-[80%]  max-w-[80%] px-7 py-6 ">
        <div className=" mb-2.5  font-bold text-xl ">Top Produit Vendu</div>
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                Nom
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                Qantité vendue
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                Quantité restante
              </td>
              <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                Prix unitaire
              </td>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {item?.nom}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {item?.Total_quantite_vendu}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {item?.Total_quantite_stock}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatPrice(item?.Prix) + " f"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopProduitSellAll;
