import { useEffect, useState } from "react";
import { UseAuthContext } from "../../Context/AuthContext";
import { NavLink, useNavigate, useOutletContext } from "react-router";
import TanStackTable from "../../tanStack/Table/tanStackTable";
import { flexRender } from "@tanstack/react-table";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import { IoFilter } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";
import useInStock from "../../hooks/useInStock";
import columnsEntreStock from "../../tanStack/Columns/EntreStockColumn";
import AddEntreStockComponent from "../../components/addEntre/AddEntreStockComponent";

export function InStock() {
  const navigate = useNavigate();
  const { user, isloading } = UseAuthContext();
  const [hideAddComponet, setAddEntreComponent] = useState(false);
  const handleHideAddEntreComponent = () => setAddEntreComponent((c) => !c);

  useEffect(() => {
    if (!isloading && !user) {
      navigate("/login");
    }
  }, [user, isloading, navigate]);
  const { isLoading, isError, error, data } = useInStock();
  const propsOutlet = useOutletContext();
  const table = TanStackTable({
    Data: data,
    globalFilter: propsOutlet.globalFilter,
    setGlobalFilter: propsOutlet.setGlobalFilter,
    columns: columnsEntreStock,
  });
  if (isLoading) {
    return <SpinnerComponent />;
  }
  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className=" flex-1 w-fullv overflow-auto   flex flex-col py-2.5 px-1.5 bg-white ">
        <div className="flex justify-between py-1.5">
          <div className=" uppercase"> Entrée de produit</div>
          <div className="flex  items-center">
            <ButtonComponent
              handleClick={handleHideAddEntreComponent}
              name={"Nouvelle Entrée "}
            />
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
                      <NavLink
                        className="w-6 inline-block"
                        to={`/stock/entre/${row.original.id}/detail`}
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
      {hideAddComponet && (
        <AddEntreStockComponent
          usernameId={user.id}
          setAddEntreComponent={setAddEntreComponent}
        />
      )}
    </>
  );
}
