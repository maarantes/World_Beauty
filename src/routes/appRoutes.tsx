import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardCliente from "../pages/dashboard_cliente/dashboardCliente";



export default function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/clientes",
      element: <DashboardCliente />,
    },

  ]);

  return (
      <RouterProvider router={router} />
  );
}