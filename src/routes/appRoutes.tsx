import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardCliente from "../pages/dashboard_cliente/dashboardCliente";
import Footer from "../components/footer/footer";



export default function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/clientes",
      element: <DashboardCliente />,
    },

  ]);

  return (
      <>
      <RouterProvider router={router} />
      <Footer />
      </>
  );
}