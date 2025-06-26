import React from "react";
import { InputComponent } from "../InputComponent/InputComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";
import useSuppliers from "../../hooks/useSuppliers";
import SelectComponent from "../SelectComponent/SelectComponent";
import useForm from "../../hooks/useForm";
import useCreateProductMutation from "../../hooks/useCreateProductMutation";
import SpinnerComponent from "../Spinner/SpinnerComponent";
import { toast, ToastContainer } from "react-toastify";
import useCategorie from "../../hooks/useCategorie";

function AddProduitComponent({ setAddComponent }) {
  const { isLoading: isLoadingSuppliers, data } = useSuppliers();
  const { isLoading: isLoadingCategorie, data: dataCategorie } = useCategorie();
  const initialeValue = {
    nom: "",
    fournisseurId: "",
    categorieId: "",
    prixAchat: "",
    prixVente: "",
    description: "",
    quantite: "",
    seuilApprovisionnement: "",
  };
  const { mutate, isPending } = useCreateProductMutation();
  const onSubmit = (inputValue) => {
    mutate(inputValue, {
      onSuccess: () => {
        setAddComponent(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
    // console.log(inputValue);
  };
  const { inputValue, handleChange, handleSubmit } = useForm(
    initialeValue,
    onSubmit
  );
  if (isLoadingSuppliers || isLoadingCategorie) {
    return <SpinnerComponent />;
  }
  return (
    <div className=" absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-30 ">
      <div className="bg-white rounded-sm h-[90%] w-120 px-7 py-6 flex justify-between flex-col">
        <div className=" mb-3 font-bold text-xl ">Nouveau Produit</div>
        <form
          className=" flex-1 flex flex-col overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className=" flex-1  ">
            <InputComponent
              label={"Nom de produit"}
              name={"nom"}
              type={"text"}
              value={inputValue.nom}
              id={"nameProduit"}
              placeholder={"Entrez le nom du produit"}
              handlechange={handleChange}
              addInput={true}
            />
            <InputComponent
              label={"Description"}
              name={"description"}
              type={"text"}
              value={inputValue.description}
              id={"description"}
              placeholder={"Entrez une description"}
              handlechange={handleChange}
              addInput={true}
            />
            <SelectComponent
              items={data}
              value={inputValue.fournisseurId}
              title={"Fournisseur"}
              handleChange={handleChange}
              name={"fournisseurId"}
              placeholder={"Selectionner un fournisseur"}
            />

            <InputComponent
              label={"Prix d'achat"}
              name={"prixAchat"}
              type={"number"}
              value={inputValue.prixAchat}
              id={"prixAchat"}
              placeholder={"Entrez le prix d'achat"}
              handlechange={handleChange}
              addInput={true}
            />
            <SelectComponent
              items={dataCategorie}
              value={inputValue.categorieId}
              title={"Categorie"}
              handleChange={handleChange}
              name={"categorieId"}
              placeholder={"Selectionner une categorie"}
            />
            <InputComponent
              label={"Prix de vente"}
              name={"prixVente"}
              type={"number"}
              value={inputValue.prixVente}
              id={"prixVente"}
              placeholder={"Entrez le prix d'achat"}
              handlechange={handleChange}
              addInput={true}
            />

            <InputComponent
              label={"Quantité initial"}
              name={"quantite"}
              type={"number"}
              value={inputValue.quantite}
              id={"quantite"}
              placeholder={"Entrez la quantité de produit"}
              handlechange={handleChange}
              addInput={true}
            />
            <InputComponent
              label={"Seuil d'approvisionement"}
              name={"seuilApprovisionnement"}
              type={"number"}
              value={inputValue.seuilApprovisionnement}
              id={"seuilApprovisionnement"}
              placeholder={"Entrez le seuil d'approvisionement"}
              handlechange={handleChange}
              addInput={true}
            />
          </div>
          <div className=" flex justify-end gap-2 ">
            <ButtonComponent
              name={"Annuler"}
              handleClick={() => setAddComponent(false)}
            />

            <ButtonComponent
              disable={isPending}
              name={isPending ? "Creation" : "Ajouter"}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProduitComponent;
