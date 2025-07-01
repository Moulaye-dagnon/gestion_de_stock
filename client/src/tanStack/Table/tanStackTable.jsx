import React, { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

function TanStackTable({
  Data,
  globalFilter,
  setGlobalFilter,
  columns,
  quantiteFilter,
}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (Data) setData(Data);
  }, [Data]);

  const table = useReactTable({
    data,
    state: {
      globalFilter,
      columnFilters: [{ id: "quantiteStock", value: quantiteFilter || "Tout" }],
    },

    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 15,
      },
    },
  });
  return table;
}

export default TanStackTable;
