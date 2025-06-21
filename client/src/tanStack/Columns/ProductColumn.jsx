import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columnsProduct = [
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

export default columnsProduct;
