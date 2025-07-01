import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columnsClient = [
  columnHelper.accessor("nom", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Nom</span>,
  }),
  columnHelper.accessor("telephone", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Telephone</span>,
  }),
  columnHelper.accessor("adresse", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Adresse</span>,
  }),
];

export default columnsClient;
