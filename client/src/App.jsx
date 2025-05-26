import { AiFillApple } from "react-icons/ai";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home/home";
import { Inventaire } from "./pages/Inventaire/Inventaire";
import { Rapport } from "./pages/rapport/Rapport";
import { Register } from "./pages/register/Register";
import { Login } from "./pages/login/Login";
import { UseAuthContext } from "./Context/AuthContext";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";

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
          path: "/rapport",
          element: (
            <PrivateRoute>
              <Rapport />
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
  return <RouterProvider router={root} />;
}

export default App;
