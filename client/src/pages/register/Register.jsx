import { useState } from "react";
import AuthLayout from "../../components/AuthLAyout/AuthLayout";
import { InputComponent } from "../../components/InputComponent/InputComponent";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { register_api } from "../../api/register_api";
import useForm from "../../hooks/useForm";

export function Register() {
  const navigate = useNavigate();
  const initiaValue = {
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onsubmit = (inputValue) => {
    if (inputValue.password === inputValue.confirmPassword) {
      register_api({
        nom: inputValue.nom,
        email: inputValue.email,
        password: inputValue.password,
        navigate: navigate,
      });
    } else {
      console.log("les password ne sont pas les meme");
    }
  };

  const { inputValue, handleChange, handleSubmit } = useForm(
    initiaValue,
    onsubmit
  );
  return (
    <div className="w-full py-2 md:py-5 px-10">
      <AuthLayout>
        <div>
          <AiOutlineStock size={"30px"} />
        </div>
        <h1 className="text-3xl mb-10 font-bold">Créer un compte</h1>
        <form onSubmit={handleSubmit} action="">
          <InputComponent
            label={"Nom *"}
            name={"nom"}
            type={"text"}
            value={inputValue.nom}
            id={"nom"}
            placeholder={"Entrez votre nom"}
            handlechange={handleChange}
          />
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
          <InputComponent
            label={"Confirmer votre mot de passe *"}
            name={"confirmPassword"}
            type={"password"}
            value={inputValue.confirmPassword}
            id={"confirmPassword"}
            placeholder={"Confirmer votre mot de passe"}
            handlechange={handleChange}
          />
          <div className="w-80">
            <ButtonComponent
              style={{ width: "100%" }}
              type={"submit"}
              name={"Créez votre compte"}
            />
          </div>
        </form>
        <small className="mt-2">
          Vous avez déjà un compte?
          <NavLink className=" underline text-blue-400" to={"/login"}>
            Se connecter
          </NavLink>
        </small>
      </AuthLayout>
    </div>
  );
}
