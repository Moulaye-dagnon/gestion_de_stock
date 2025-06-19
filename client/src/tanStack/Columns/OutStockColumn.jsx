import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columnSortieStock = [
  columnHelper.accessor("produit", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Produit</span>,
  }),

  columnHelper.accessor("quantiteSortie", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Quantité Entrée</span>,
  }),
  columnHelper.accessor("dateSortie", {
    cell: (info) => {
      const date = new Date(info.getValue());
      return date.toISOString().split("T")[0];
    },
    header: () => <span className="flex item-center">Date Sortie</span>,
  }),
];

export default columnSortieStock;
