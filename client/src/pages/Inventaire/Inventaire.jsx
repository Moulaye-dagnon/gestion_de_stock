import { useEffect } from "react";
import { UseAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import OverallComponent from "../../components/Overrall/OverallComponent";

export function Inventaire() {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  //   useEffect(() => {
  //     if (!user) {
  //       navigate("/login");
  //     }
  //   }, []);
  return (
    <div className=" flex flex-col gap-y-2 py-2.5 px-1 ">
      <OverallComponent title="Inventaire global" />
      <div className=" flex-1 flex flex-col  ">
        <div className=" flex justify-between items-center">
			<div>Produits</div>
			<div></div> 
		</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
