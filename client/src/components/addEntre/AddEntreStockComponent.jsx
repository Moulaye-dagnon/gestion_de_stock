import React from "react";
import useSuppliers from "../../hooks/useSuppliers";
import useProduit from "../../hooks/useProduit";
import useCreateEntreProductMutation from "../../hooks/useCreateEntreProductMutation";
import useForm from "../../hooks/useForm";
import SelectComponent from "../SelectComponent/SelectComponent";
import { InputComponent } from "../InputComponent/InputComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";
import SpinnerComponent from "../Spinner/SpinnerComponent";
import { toast, ToastContainer } from "react-toastify";

function AddEntreStockComponent({ setAddEntreComponent, usernameId }) {
  const { isLoading: isLoadingSuppliers, data: dataSuppliers } = useSuppliers();
  const { isLoading: isLoadingProduct, data: dataProduct } = useProduit();
  const initialeValue = {
    produitId: "",
    fournisseurId: "",
    utilisateurId: usernameId,
    dateEntre: "",
    quantiteEntre: "",
    referenceCommandeLivraison: "",
  };
  const { mutate } = useCreateEntreProductMutation();
  const onSubmit = (inputValue) => {
    mutate(inputValue, {
      onSuccess: () => {
        setAddEntreComponent(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  const { handleChange, handleSubmit, inputValue } = useForm(
    initialeValue,
    onSubmit
  );
  if (isLoadingSuppliers || isLoadingProduct) {
    return <SpinnerComponent />;
  }
  return (
    <div className="  absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-30 ">
      <div className="bg-white rounded-sm min-h-[80%] w-120 px-7 py-6 flex justify-between flex-col">
        <div className=" mb-3 font-bold text-xl ">Nouvelle Entre</div>
        <form
          className=" flex-1 flex flex-col overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className=" flex-1  ">
            <SelectComponent
              items={dataProduct}
              value={inputValue.produitId}
              title={"Produit"}
              handleChange={handleChange}
              name={"produitId"}
              placeholder={"Selectionner un produit"}
            />

            <SelectComponent
              items={dataSuppliers}
              value={inputValue.fournisseurId}
              title={"Fournisseur"}
              handleChange={handleChange}
              name={"fournisseurId"}
              placeholder={"Selectionner un fournisseur"}
            />

            <InputComponent
              label={"Quantité "}
              name={"quantiteEntre"}
              type={"number"}
              value={inputValue.quantiteEntre}
              id={"quantiteEntre"}
              placeholder={"Entrez la quantité à entrée "}
              handlechange={handleChange}
              addInput={true}
            />
            <InputComponent
              label={"Date de l'entrée "}
              name={"dateEntre"}
              type={"date"}
              value={inputValue.dateEntre}
              id={"dateEntre"}
              placeholder={"La date d'entrée de la commande "}
              handlechange={handleChange}
              addInput={true}
            />
            <InputComponent
              label={"Reference de la livraison"}
              name={"referenceCommandeLivraison"}
              type={"text"}
              value={inputValue.referenceCommandeLivraison}
              id={"referenceCommandeLivraison"}
              placeholder={"Reference de la commande de livraison"}
              handlechange={handleChange}
              addInput={true}
            />
          </div>
          <div className=" flex justify-end gap-2 ">
            <ButtonComponent
              name={"Annuler"}
              handleClick={() => setAddEntreComponent(false)}
            />

            <ButtonComponent type={"submit"} name={"Ajouter"} />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddEntreStockComponent;
