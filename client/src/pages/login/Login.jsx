import { useState } from "react";
import AuthLayout from "../../components/AuthLAyout/AuthLayout";
import { InputComponent } from "../../components/InputComponent/InputComponent";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { login_api } from "../../api/login_api";
import useForm from "../../hooks/useForm";

export function Login() {
  const navigate = useNavigate();
  const initiaValue = {
    email: "",
    password: "",
  };
  const onsubmit = (inputValue) => {
    login_api({
      email: inputValue.email,
      password: inputValue.password,
      navigate: navigate,
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
            <ButtonComponent type={"submit"} name={"Se connecter"} />
          </div>
        </form>
        <small className="mt-2">
          Vous n'avez pas de compte?
          <NavLink className=" underline text-blue-400" to={"/register"}>
            S'inscrire
          </NavLink>
        </small>
      </AuthLayout>
    </div>
  );
}
