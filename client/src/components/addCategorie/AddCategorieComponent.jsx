import { toast, ToastContainer } from "react-toastify";
import useCreateCategorieMutation from "../../hooks/useCreateCategorieMutation";
import useForm from "../../hooks/useForm";
import { InputComponent } from "../InputComponent/InputComponent";
import ButtonComponent from "../buttonComponent/ButtonComponent";
import TextareaComponent from "../TextareaComponent/TextareaComponent";

function AddCategorieComponent({ setAddCategorie }) {
  const initialeValue = {
    nom: "",
    description: "",
  };
  const { mutate, isPending } = useCreateCategorieMutation();
  const onSubmit = (inputValue) => {
    mutate(inputValue, {
      onSuccess: () => {
        setAddCategorie(false);
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
    <div className=" absolute overflow-hidden inset-0  bg-black/50 flex justify-center items-center z-40 ">
      <div className="bg-white rounded-sm h-[50%] w-120 px-7 py-6 flex justify-between flex-col">
        <div className=" mb-3 font-bold text-xl ">Nouvelle categorie</div>
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
            <TextareaComponent
              label={"Description "}
              name={"raison"}
              type={"text"}
              value={inputValue.description}
              id={"raison"}
              placeholder={"Entrez la description de la categorie (optionnel)"}
              handlechange={handleChange}
              addInput={true}
            />
          </div>
          <div className=" flex justify-end gap-2 ">
            <ButtonComponent
              name={"Annuler"}
              handleClick={() => setAddCategorie(false)}
            />

            <ButtonComponent
              disable={isPending || !inputValue.nom}
              name={isPending ? "Creation" : "Ajouter"}
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddCategorieComponent;
