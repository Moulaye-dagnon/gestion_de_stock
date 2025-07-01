import { useNavigate } from "react-router";

function CardProduit({ name1, value1, name2, value2 }) {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col bg-white rounded-md py-4  px-3 w-full ">
      <div className="text-my-handing text-xl pb-4">Résumé des produits</div>
      <div className="flex-1 flex justify-between flex-wrap divide-x-2 divide-my-border gap-x-2.5   items-center">
        <div className=" flex-1 flex  flex-col items-center gap-y-3">
          <div
            onClick={() => navigate("/fournisseur")}
            className="bg-white cursor-pointer rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-sm font-semibold text-gray-600 text-center">
              {name1}
            </h2>
            <p className="text-lg font-bold text-gray-800">{value1}</p>
          </div>
        </div>
        <div className=" flex-1 flex  flex-col items-center gap-y-3">
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-gray-600 text-center">
              {name2}
            </h2>
            <p className="text-lg font-bold text-gray-800">{value2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduit;
