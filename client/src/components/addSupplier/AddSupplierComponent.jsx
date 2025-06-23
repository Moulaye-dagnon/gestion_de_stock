import { InputComponent } from "../InputComponent/InputComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";
import SelectComponent from "../SelectComponent/SelectComponent";
import useForm from "../../hooks/useForm";
import useCreateSupplierMutation from "../../hooks/useCreateSupplierMutation";
import { toast, ToastContainer } from "react-toastify";
function AddSupplierComponent({ setAddSupplierComponent }) {
  const initialeValue = {
    nom: "",
    telephone: "",
    adresse: "",
  };
  const { mutate, isPending } = useCreateSupplierMutation();
  const onSubmit = (inputValue) => {
    mutate(inputValue, {
      onSuccess: () => {
        setAddSupplierComponent(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  const { inputValue, handleChange, handleSubmit } = useForm(
    initialeValue,
    onSubmit
  );

  return (
    <div className=" absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-30 ">
      <div className="bg-white rounded-sm h-[80%] w-120 px-7 py-6 flex justify-between flex-col">
        <div className=" mb-3 font-bold text-xl ">Nouveau fournisseur</div>
        <form
          className=" flex-1 flex flex-col overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className=" flex-1  ">
            <InputComponent
              label={"Nom du fournisseur"}
              name={"nom"}
              type={"text"}
              value={inputValue.nom}
              id={"namefournisseur"}
              placeholder={"Entrez le nom du fournisseur"}
              handlechange={handleChange}
              addInput={true}
            />
            <InputComponent
              label={"Telephone"}
              name={"telephone"}
              type={"tel"}
              placeholder="+223 XX XX XX XX"
              value={inputValue.telephone}
              id={"description"}
              handlechange={handleChange}
              addInput={true}
            />

            <InputComponent
              label={"Adresse du fournisseur"}
              name={"adresse"}
              type={"text"}
              value={inputValue.adresse}
              id={"adresse"}
              placeholder={"Entrez l'adresse du fournisseur"}
              handlechange={handleChange}
              addInput={true}
            />
          </div>
          <div className=" flex justify-end gap-2 ">
            <ButtonComponent
              name={"Annuler"}
              handleClick={() => setAddSupplierComponent(false)}
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

export default AddSupplierComponent;
