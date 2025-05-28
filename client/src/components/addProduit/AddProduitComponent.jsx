import React from "react";
import { InputComponent } from "../InputComponent/InputComponent";

function AddProduitComponent({ setAddComponent }) {
  return (
    <div
      onClick={() => setAddComponent(false)}
      className=" absolute inset-0 backdrop-blur-sm bg-white/15 flex justify-center items-center "
    >
      <div className="bg-white rounded-sm h-[80] w-100 ">
        <div className="font-bold text-xl ">Nouveau Produit</div>
        <div>
         
        </div>
      </div>
    </div>
  );
}

export default AddProduitComponent;
