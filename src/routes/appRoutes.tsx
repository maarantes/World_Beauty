import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardCliente from "../pages/dashboard/dashboardCliente";
import Footer from "../components/footer/footer";
import DashboardProduto from "../pages/dashboard/dashboardProduto";
import { ProdutoProvider } from '../contexts/produtoProvider';
import DashboardServico from "../pages/dashboard/dashboardServico";
import { ServicoProvider } from "../contexts/servicoProvider";
import { ClienteProvider } from "../contexts/clienteProvider";



export default function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/clientes",
      element:
      <ClienteProvider>
        <DashboardCliente />,
      </ClienteProvider>
    },
    {
      path: "/produtos",
      element:
      <>
      <ProdutoProvider>
        <DashboardProduto />
      </ProdutoProvider>
      </>,
    },
    {
      path: "/servicos",
      element:
      <>
      <ServicoProvider>
        <DashboardServico />
      </ServicoProvider>
      </>,
    }

  ]);

  return (
      <>
      <RouterProvider router={router} />
      <Footer />
      </>
  );
}