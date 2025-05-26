import { Navigate } from "react-router";
import { UseAuthContext } from "../Context/AuthContext";

export function PrivateRoute({ children }) {
  const { user, isloading } = UseAuthContext();
  console.log(user);
  if (isloading) {
    return <div>.....chargement</div>;
  }
  return user ? children : <Navigate to={"/login"} />;
}
