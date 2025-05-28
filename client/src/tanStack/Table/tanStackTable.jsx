import React, { useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useOutletContext } from "react-router";
const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("nom", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Produit</span>,
  }),
  columnHelper.accessor("prixAchat", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Prix d'achat</span>,
  }),
  columnHelper.accessor("prixVente", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Prix de vente</span>,
  }),
  columnHelper.accessor("categorie", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Categorie</span>,
  }),
  columnHelper.accessor("quantiteStock", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Quantité</span>,
  }),
];

function TanStackTable({ Data, globalFilter, setGlobalFilter }) {
  const [data] = useState(Data || []);

  const table = useReactTable({
    data,
    state: {
      globalFilter,
    },

    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });
  return table;
}

export default TanStackTable;
