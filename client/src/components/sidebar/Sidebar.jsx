import { NavLink } from "react-router-dom";

import Home from "../../assets/Home.svg";
import inventaire from "../../assets/inventaire.svg";
import store from "../../assets/store.svg";
import order from "../../assets/order.svg";
import suppliers from "../../assets/suppliers.svg";

import React from "react";
import { AiOutlineStock } from "react-icons/ai";

function Sidebar({ Open }) {
  return (
    <div className="flex flex-col h-full w-full items-center p-5 text-white md:text-black border-r bg-white rounded-r-xl border-my-border  ">
      <div className=" flex text-black flex-col justify-start  h-1/2 w-full items-center ">
        <div className=" flex items-center justify-between  ">
          <span className="w-10">
            <AiOutlineStock size={"100%"} />
          </span>
          <span className=" inline-block mx-1">My_Stock</span>
        </div>
        <div className=" w-full px-4 mt-6">
          <ul className=" w-full">
            <li className=" my-4 w-full">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 px-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="w-5">
                  <img src={Home} alt="" srcset="" />
                </span>
                <span>Home</span>
              </NavLink>
            </li>
            <li className=" my-4 w-full">
              <NavLink
                to={"/inventaire"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 px-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="w-5 ">
                  <img src={inventaire} alt="" srcset="" />
                </span>
                <span>Inventaire</span>
              </NavLink>
            </li>

            <li className=" my-4 w-full">
              <NavLink
                to={"/entrestock"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 px-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="w-5 ">
                  <img src={inventaire} alt="" srcset="" />
                </span>
                <span>Entrée </span>
              </NavLink>
            </li>
            <li className=" my-4 w-full">
              <NavLink
                to={"/sortiestock"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 px-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="w-5 ">
                  <img src={inventaire} alt="" srcset="" />
                </span>
                <span>Sortie</span>
              </NavLink>
            </li>
            <li className=" my-4 w-full">
              <NavLink
                to={"/rapport"}
                className={({ isActive }) =>
                  `flex items-center w-full  gap-2.5 py-2 px-1 rounded-md transition-all ${
                    isActive
                      ? "bg-gray-200 shadow-lg text-my-primary"
                      : "bg-white"
                  } hover:bg-gray-100 hover:shadow-lg text-my-sub-hanging`
                }
              >
                <span className="w-5 ">
                  <img src={store} alt="" srcset="" />
                </span>
                <span>Rapport</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Sidebar;
