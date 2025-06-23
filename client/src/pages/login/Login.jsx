import AuthLayout from "../../components/AuthLAyout/AuthLayout";
import { InputComponent } from "../../components/InputComponent/InputComponent";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import useForm from "../../hooks/useForm";
import { UseAuthContext } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import useLoginMutation from "../../hooks/useLoginMutation";

export function Login() {
  const navigate = useNavigate();
  const { setUser } = UseAuthContext();
  const initiaValue = {
    email: "",
    password: "",
  };
  const { mutate } = useLoginMutation({ setUser });
  const onsubmit = (inputValue) => {
    mutate(inputValue, {
      onSuccess: () => {
        navigate("/");
        toast.success("Connexion réussie");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };
  const { inputValue, handleChange, handleSubmit } = useForm(
    initiaValue,
    onsubmit
  );
  return (
    <div className="w-full py-15 md:py-24 px-10">
      <AuthLayout>
        <div>
          <AiOutlineStock size={"30px"} />
        </div>
        <h1 className="text-3xl mb-10 font-bold">
          Connectez-vous à votre compte
        </h1>

        <form onSubmit={handleSubmit} action="">
          <InputComponent
            label={"Email *"}
            name={"email"}
            type={"email"}
            value={inputValue.email}
            id={"email"}
            placeholder={"Entrez votre Email"}
            handlechange={handleChange}
          />
          <InputComponent
            label={"Mot de passe *"}
            name={"password"}
            type={"password"}
            value={inputValue.password}
            id={"password"}
            placeholder={"Créez  votre mot de passe"}
            handlechange={handleChange}
          />

          <div className="w-80">
            <ButtonComponent
              style={{ width: "100%" }}
              type={"submit"}
              name={"Se connecter"}
            />
          </div>
        </form>

        <ToastContainer />
      </AuthLayout>
    </div>
  );
}
