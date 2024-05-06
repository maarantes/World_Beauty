import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardCliente from "../pages/dashboard/dashboardCliente";
import Footer from "../components/footer/footer";
import DashboardProduto from "../pages/dashboard/dashboardProduto";



export default function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/clientes",
      element: <DashboardCliente />,
    },
    {
      path: "/produtos",
      element: <DashboardProduto />,
    },

  ]);

  return (
      <>
      <RouterProvider router={router} />
      <Footer />
      </>
  );
}