import { NavLink } from "react-router-dom";

import Home from "../../assets/Home.svg";
import inventaire from "../../assets/inventaire.svg";
import suppliers from "../../assets/suppliers.svg";
import store from "../../assets/store.svg";
import order from "../../assets/order.svg";
import { AiOutlineStock } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { UseAuthContext } from "../../Context/AuthContext";
import useLogoutMutation from "../../hooks/useLogoutMutation";

function Sidebar() {
  const { setUser } = UseAuthContext();
  const { mutate, isPending } = useLogoutMutation();
  const handleLogout = () => {
    mutate(null, {
      onSuccess: () => setUser(null),
    });
  };
  return (
    <div className="flex flex-col justify-between h-full w-full items-center p-5 text-white md:text-black border-r bg-white rounded-r-xl border-my-border  ">
      <div className=" flex text-black flex-col justify-start  h-1/2 w-full items-center ">
        <div className=" flex items-center justify-between  ">
          <span className="w-10">
            <AiOutlineStock size={"100%"} />
          </span>
          <span className=" inline-block mx-1">My_Stock</span>
        </div>
        <div className=" w-full px-2 mt-6">
          <ul className=" w-full">
            <li className=" my-4 w-full">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 pl-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="flex-none w-5">
                  <img src={store} alt="" srcset="" />
                </span>
                <span>Board</span>
              </NavLink>
            </li>
            <li className=" my-4 w-full">
              <NavLink
                to={"/stock/entre"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 pl-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="flex-none w-5 ">
                  <img src={order} alt="" srcset="" />
                </span>
                <span>Entrée </span>
              </NavLink>
            </li>
            <li className=" my-4 w-full">
              <NavLink
                to={"/stock/sortie"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 pl-1  rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="flex-none w-5 ">
                  <img src={order} alt="" srcset="" />
                </span>
                <span>Sortie</span>
              </NavLink>
            </li>
            <li className=" my-4 w-full">
              <NavLink
                to={"/inventaire"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 pl-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="flex-none w-5 ">
                  <img src={inventaire} alt="" srcset="" />
                </span>
                <span>Inventaire</span>
              </NavLink>
            </li>

            <li className=" my-4 w-full">
              <NavLink
                to={"/client"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 pl-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="flex-none w-5 ">
                  <img src={suppliers} alt="" srcset="" />
                </span>
                <span>Clients</span>
              </NavLink>
            </li>

            <li className=" my-4 w-full">
              <NavLink
                to={"/fournisseur"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 pl-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="flex-none w-5 ">
                  <img src={suppliers} alt="" srcset="" />
                </span>
                <span>Fournisseurs</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <button
        style={{ color: "black" }}
        onClick={handleLogout}
        disabled={isPending}
        className=" cursor-pointer flex justify-between items-center text-black"
      >
        <span className="w-8">
          <FiLogOut width={"100%"} />
        </span>
        <span className="text-black">Deconnexion</span>
      </button>
    </div>
  );
}

export default Sidebar;
