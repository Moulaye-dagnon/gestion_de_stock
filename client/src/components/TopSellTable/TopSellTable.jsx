function TopSellTable({ data, handleOnclick }) {
  return (
    <div className=" flex flex-col bg-white rounded-md py-4  px-3 w-full ">
      <div className="text-my-handing text-xl pb-4 flex items-center justify-between">
        <span className="flex-1 ">Top produit vendu</span>
        <span
          onClick={handleOnclick}
          className="flex-none underline text-blue-300 text-xs cursor-pointer "
        >
          Voir tout
        </span>
      </div>
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
                {item?.Prix}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopSellTable;
