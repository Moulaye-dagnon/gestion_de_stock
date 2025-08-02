import { AiFillApple } from "react-icons/ai";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home/home";
import { Inventaire } from "./pages/Inventaire/Inventaire";
import { Rapport } from "./pages/rapport/Rapport";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { AuthContextProvider } from "./Context/AuthContext";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import ProduitDetail from "./pages/ProduitDetail/ProduitDetail";
import { InStock } from "./pages/inStock/InStock";
import OutStockDetail from "./pages/outStockDetail/OutStockDetail";
import { OutStock } from "./pages/outStock/OutStock";
import InStockDetail from "./pages/inStockDetail/InStockDetail";
import Supplier from "./pages/Suppliers/Supplier";
import SupplierDetail from "./pages/SupplierDetail/SupplierDetail";
import Client from "./pages/ClientPage/Client";
import ClientDetail from "./pages/ClientDetail/ClientDetail";

function App() {
  const root = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: "/inventaire",
          element: (
            <PrivateRoute>
              <Inventaire />
            </PrivateRoute>
          ),
        },
        {
          path: "/inventaire/produit/:produitId/detail",
          element: (
            <PrivateRoute>
              <ProduitDetail />
            </PrivateRoute>
          ),
        },
        {
          path: "/client",
          element: (
            <PrivateRoute>
              <Client />
            </PrivateRoute>
          ),
        },
        {
          path: "/client/:clientId/detail",
          element: (
            <PrivateRoute>
              <ClientDetail />
            </PrivateRoute>
          ),
        },
        {
          path: "/fournisseur",
          element: (
            <PrivateRoute>
              <Supplier />
            </PrivateRoute>
          ),
        },
        {
          path: "/fournisseur/:fournisseurId/detail",
          element: (
            <PrivateRoute>
              <SupplierDetail />
            </PrivateRoute>
          ),
        },
        {
          path: "/stock/entre",
          element: (
            <PrivateRoute>
              <InStock />
            </PrivateRoute>
          ),
        },
        {
          path: "/stock/entre/:entreStockId/detail",
          element: (
            <PrivateRoute>
              <InStockDetail />
            </PrivateRoute>
          ),
        },
        {
          path: "/stock/sortie",
          element: (
            <PrivateRoute>
              <OutStock />
            </PrivateRoute>
          ),
        },
        {
          path: "/stock/sortie/:sortieStockId/detail",
          element: (
            <PrivateRoute>
              <OutStockDetail />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <AuthContextProvider>
      <RouterProvider router={root} />;
    </AuthContextProvider>
  );
}

export default App;
