import React from "react";

function OverallComponent({ title = "Inventaire global" }) {
  return (
    <div className=" flex flex-col bg-white rounded-md py-4 px-3 ">
      <div className="text-my-handing text-xl pb-4">{title}</div>
      <div className="flex justify-between divide-x-2 divide-my-border items-center">
        <div className=" flex-none w-1/4 flex  flex-col gap-y-3">
          <span className=" text-my-primary text-sm  ">Categories</span>
          <span className=" text-my-handing text-lg">10</span>
          <span className=" text-my-body text-sm">7 derniers jours</span>
        </div>
        <div className="flex-none w-1/4 flex  flex-col gap-y-3">
          <span
            style={{ color: "#E19133" }}
            className=" text-my-primary text-sm  "
          >
            Produits totaux
          </span>
          <span className=" text-my-handing text-lg">10</span>
          <span className=" text-my-body text-sm">7 derniers jours</span>
        </div>
        <div className="flex-none w-1/4 flex  flex-col gap-y-3">
          <span
            style={{ color: "#F36960" }}
            className=" text-my-primary text-sm  "
          >
            Stock faible
          </span>
          <span className=" text-my-handing text-lg">10</span>
          <span className=" text-my-body text-sm">7 derniers jours</span>
        </div>
      </div>
    </div>
  );
}

export default OverallComponent;
