import useStatTopCategorie from "../../hooks/Stat/useStatTopCategorie";
import { formatPrice } from "../../utils/FormatPrice";
import SpinnerComponent from "../Spinner/SpinnerComponent";
import { IoMdClose } from "react-icons/io";

function CategorieList({ setOverallTopCategorie }) {
  const { isLoading: isLoadingStatTopCategorie, data } = useStatTopCategorie();
  if (isLoadingStatTopCategorie) return <SpinnerComponent />;
  console.log(data);

  return (
    <div className=" absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-40 ">
      <span
        onClick={() => setOverallTopCategorie(false)}
        className=" cursor-pointer transition-all hover:scale-90 w-15 absolute top-2.5 right-2.5"
      >
        <IoMdClose size={"100%"} />
      </span>
      <div className="bg-white rounded-sm max-h-[80%] w-120 px-7 py-6 ">
        <div className=" mb-2.5  font-bold text-xl ">
          Les categories les plus vendu
        </div>
        <table className="w-full overflow-y-auto ">
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
            {data?.TopCategorie.map((item, index) => (
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
    </div>
  );
}

export default CategorieList;
