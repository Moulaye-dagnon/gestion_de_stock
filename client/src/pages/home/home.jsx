import { useEffect } from "react";
import OverallComponent from "../../components/Overrall/OverallComponent";
import { UseAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  const { user, isloading } = UseAuthContext();
  useEffect(() => {
    if ((!isloading && !user) || !user) {
      navigate("/login");
    }
  }, [user, isloading, navigate]);
  return (
    <div className="flex-1 px-4 flex flex-col gap-y-2 overflow-auto   w-full">
      <OverallComponent  />
    </div>
  );
}
