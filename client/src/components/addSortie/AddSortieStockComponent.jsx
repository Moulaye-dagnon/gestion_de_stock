import React from "react";
import useProduit from "../../hooks/useProduit";
import useForm from "../../hooks/useForm";
import SpinnerComponent from "../Spinner/SpinnerComponent";
import SelectComponent from "../SelectComponent/SelectComponent";
import { InputComponent } from "../InputComponent/InputComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";
import TextareaComponent from "../TextareaComponent/TextareaComponent";
import useCreateSortieMutation from "../../hooks/useCreateSortieMutation";
import { toast, ToastContainer } from "react-toastify";
function AddSortieStockComponent({ usernameId, setAddSortieComponent }) {
  const { isLoading: isLoadingProduct, data: dataProduct } = useProduit();
  const initialeValue = {
    produitId: "",
    utilisateurId: usernameId,
    quantiteSortie: "",
    raison: "",
  };
  const { mutate } = useCreateSortieMutation();
  const onSubmit = (inputValue) => {
    mutate(inputValue, {
      onSuccess: () => {
        setAddSortieComponent(false);
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
  if (isLoadingProduct) {
    return <SpinnerComponent />;
  }
  return (
    <div className="  absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-30 ">
      <div className="bg-white rounded-sm min-h-[50%] w-120 px-7 py-6 flex justify-between flex-col">
        <div className=" mb-3 font-bold text-xl ">Nouvelle Sortie</div>
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

            <InputComponent
              label={"Quantité "}
              name={"quantiteSortie"}
              type={"number"}
              value={inputValue.quantiteSortie}
              id={"quantiteSortie"}
              placeholder={"Entrez la quantité à entrée "}
              handlechange={handleChange}
              addInput={true}
            />

            <TextareaComponent
              label={"Reference de la livraison"}
              name={"raison"}
              type={"text"}
              value={inputValue.raison}
              id={"raison"}
              placeholder={"Reference de la commande de livraison"}
              handlechange={handleChange}
              addInput={true}
            />
          </div>
          <div className=" flex justify-end gap-2 ">
            <ButtonComponent
              name={"Annuler"}
              handleClick={() => setAddSortieComponent(false)}
            />

            <ButtonComponent type={"submit"} name={"Ajouter"} />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddSortieStockComponent;
