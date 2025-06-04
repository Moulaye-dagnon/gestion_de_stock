import { useEffect, useState } from "react";
import { UseAuthContext } from "../../Context/AuthContext";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import OverallComponent from "../../components/Overrall/OverallComponent";
import useProduit from "../../hooks/useProduit";
import TanStackTable from "../../tanStack/Table/tanStackTable";
import { flexRender } from "@tanstack/react-table";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import { IoFilter } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import AddProduitComponent from "../../components/addProduit/AddProduitComponent";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";

export function Inventaire() {
  const navigate = useNavigate();
  const [hideAddComponet, setAddComponent] = useState(false);
  const handleHideAddComponent = () => setAddComponent((c) => !c);
  const { user } = UseAuthContext();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const { isLoading, error, data } = useProduit();
  const propsOutlet = useOutletContext();
  const table = TanStackTable({
    Data: data,
    globalFilter: propsOutlet.globalFilter,
    setGlobalFilter: propsOutlet.setGlobalFilter,
  });
  if (isLoading) {
    return <SpinnerComponent />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className=" flex-1 flex flex-col gap-y-2 overflow-auto   w-full ">
        <OverallComponent title="Inventaire global" />
        <div className=" flex-1   flex flex-col py-2.5 px-1.5 bg-white ">
          <div className="flex justify-between py-1.5">
            <div>Produit</div>
            <div className="flex  items-center">
              <ButtonComponent
                name={"Ajouter"}
                handleClick={handleHideAddComponent}
              />
              <span className=" flex items-center py-2 px-4 border rounded-sm border-my-border ml-2 ">
                <span className="w-5 mr-2  ">
                  <IoFilter size={"100%"} />
                </span>
                Filtré
              </span>
            </div>
          </div>
          <div className=" flex-1 px-2 py-2 flex flex-col ">
            <div className=" flex-1 overflow-x-auto ">
              <table className="min-w-full divide-y border-collapse  divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroups) => (
                    <tr key={headerGroups.id}>
                      {headerGroups.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                      <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                        Disponibilité
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wide">
                        Details
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2 whitespace-nowrap text-sm text-gray-500"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        En Stock
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        <NavLink
                          className="w-6 inline-block"
                          to={`/inventaire/produit/${row.original.id}/detail`}
                        >
                          <IoIosArrowRoundForward size={"100%"} />
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" flex justify-between items-center">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className=" px-4 py-2.5 border border-my-body rounded-sm disabled:opacity-50"
              >
                Précédent
              </button>
              <span>
                Page {table.getState().pagination.pageIndex + 1} sur{" "}
                {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2.5 border border-my-body rounded-sm disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
      {hideAddComponet && (
        <AddProduitComponent setAddComponent={setAddComponent} />
      )}
    </>
  );
}
