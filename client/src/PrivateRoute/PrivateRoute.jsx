import { Navigate } from "react-router";
import { UseAuthContext } from "../Context/AuthContext";
import SpinnerComponent from "../components/Spinner/SpinnerComponent";

export function PrivateRoute({ children }) {
  const auth = UseAuthContext();
  if (!auth) return <SpinnerComponent />;
  const { user, isloading } = auth;
  if (isloading) return <SpinnerComponent />;

  if (!user) return <Navigate to={"/login"} />;
  return children;
}
