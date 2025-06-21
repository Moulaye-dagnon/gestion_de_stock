import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columnsEntreStock = [
  columnHelper.accessor("produit", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Produit</span>,
  }),
  columnHelper.accessor("fournisseur", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Fournisseur</span>,
  }),
  columnHelper.accessor("quantiteEntre", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Quantité Entrée</span>,
  }),
  columnHelper.accessor("dateEntre", {
    cell: (info) => {
      const date = new Date(info.getValue());
      return date.toISOString().split("T")[0];
    },
    header: () => <span className="flex item-center">Date Entrée</span>,
  }),
];

export default columnsEntreStock;
