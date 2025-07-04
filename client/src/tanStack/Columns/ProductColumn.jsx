import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columnsProduct = [
  columnHelper.accessor("nom", {
    id: "nom",
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Produit</span>,
  }),
  columnHelper.accessor("prixAchat", {
    id: "prixAchat",
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Prix d'achat</span>,
  }),
  columnHelper.accessor("prixVente", {
    id: "prixVente",
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Prix de vente</span>,
  }),
  columnHelper.accessor("categorie", {
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Categorie</span>,
  }),
  columnHelper.accessor("quantiteStock", {
    id: "quantiteStock",
    cell: (info) => info.getValue(),
    header: () => <span className="flex item-center">Quantité</span>,
  }),
  columnHelper.accessor(
    (row) => {
      const quantite = parseFloat(row.quantiteStock);
      const seuil = parseFloat(row.seuilApprovisionnement);

      const dispo =
        quantite === 0
          ? "rupture"
          : quantite <= seuil
          ? "stock faible"
          : "en stock";

      row.disponibilite = dispo;
      return dispo;
    },
    {
      id: "Disponibilité",
      cell: (info) => {
        const value = info.getValue();
        const styles = {
          rupture: "text-red-600 font-semibold",
          "stock faible": "text-yellow-600 font-medium",
          "en stock": "text-green-600",
        };
        return (
          <span className={styles[value]}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
      header: () => <span className="flex item-center">Disponibilité</span>,
    }
  ),
];

export default columnsProduct;
