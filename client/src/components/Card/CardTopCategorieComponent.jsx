import { formatPrice } from "../../utils/FormatPrice";

function CardTopCategorieComponent({ data }) {
  return (
    <div className=" flex flex-col bg-white rounded-md py-4  px-3 w-full ">
      <div className="text-my-handing text-xl pb-4">Top Categorie vendu</div>
      <table className="w-full">
        <thead className="bg-white border-b border-gray-200">
          <tr>
            <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
              Categorie
            </td>
            <td className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
              Chiffre d'affaires
            </td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {item?.categorie}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {formatPrice(item?.totalVente) + " fcfa"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardTopCategorieComponent;
