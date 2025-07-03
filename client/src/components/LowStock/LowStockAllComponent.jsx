import React from "react";
import useStatLowStock from "../../hooks/Stat/useStatLowStock";
import { IoMdClose } from "react-icons/io";
import SpinnerComponent from "../Spinner/SpinnerComponent";

function LowStockAllComponent({ setOverallLowStock }) {
  const { isLoading, data } = useStatLowStock();
  if (isLoading) return <SpinnerComponent />;
  return (
    <div className=" absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-40 ">
      <span
        onClick={() => setOverallLowStock(false)}
        className=" cursor-pointer transition-all hover:scale-90 w-15 absolute top-2.5 right-2.5"
      >
        <IoMdClose size={"100%"} />
      </span>
      <div className="bg-white rounded-sm max-h-[80%] w-120 px-7 py-6 ">
        <div className=" mb-2.5  font-bold text-xl ">
          Les produits en faible quantité
        </div>
        {data?.LowStock.map((item, index) => (
          <div
            key={index}
            className=" flex-none w-full  bg-white   px-2 py-1 flex  items-center justify-between hover:bg-gray-50"
          >
            <div className=" flex-1 flex  flex-col items-start justify-center">
              <div className="text-start text-base">{item?.produit}</div>
              <small className="text-sm">
                Quantité restante: {item?.quantiteStock}{" "}
              </small>
            </div>
            <span className="flex-none w-13 text-center rounded-md bg-yellow-100">
              Faible
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LowStockAllComponent;
