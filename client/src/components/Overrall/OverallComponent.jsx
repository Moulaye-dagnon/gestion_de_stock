import React from "react";
import useStatProduit from "../../hooks/useStatProduit";
import SpinnerComponent from "../Spinner/SpinnerComponent";

function OverallComponent({ title = "Inventaire global" }) {
  const { isLoading, data } = useStatProduit();
  if (isLoading) return <SpinnerComponent />;
  return (
    <div className=" flex flex-col bg-white rounded-md py-4 px-3 w-full ">
      <div className="text-my-handing text-xl pb-4">{title}</div>
      <div className="flex justify-between divide-x-2 divide-my-border items-center">
        <div className=" flex-none w-1/6 flex  flex-col gap-y-3">
          <span className=" text-my-primary text-sm  ">Categories</span>
          <span className=" text-my-handing text-lg">
            {data.TotalCategorie}
          </span>
        </div>
        <div className="flex-none w-1/4 flex  flex-col gap-y-3">
          <span
            style={{ color: "#E19133" }}
            className=" text-my-primary text-sm  "
          >
            Produits totaux
          </span>
          <span className=" text-my-handing text-lg">{data.TotalProduit}</span>
        </div>
        <div className="flex-none w-1/4 flex  flex-col gap-y-3">
          <span
            style={{ color: "#F36960" }}
            className=" text-my-primary text-sm  "
          >
            Stock
          </span>
          <div className=" flex justify-between items-center">
            <div className=" flex flex-col ">
              <span className=" text-my-handing text-lg">
                {data.LowProduit}
              </span>
              <span className=" text-my-handing text-lg">Faible</span>
            </div>
            <div className=" flex flex-col items-end ">
              <span className=" text-my-handing text-lg">
                {data.FinishedProduit}
              </span>
              <span className=" text-my-handing text-lg">épuisée</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallComponent;
