import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axiosConfig";

const AuthContext = createContext(null);
export const UseAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data);
      } catch (error) {
        console.log(
          "Erreur lors de l'authentification de l'utilisateur",
          error
        );
        setUser(null);
      } finally {
        setIsloading(false);
      }
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, isloading }}>
      {children}
    </AuthContext.Provider>
  );
};
