import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "../components/footer/footer";

import { ProdutoProvider } from '../contexts/produtoProvider';
import { ServicoProvider } from "../contexts/servicoProvider";
import { ClienteProvider } from "../contexts/clienteProvider";

import DashboardCliente from "../pages/dashboard/dashboardCliente";
import DashboardProduto from "../pages/dashboard/dashboardProduto";
import DashboardServico from "../pages/dashboard/dashboardServico";
import PaginaListagens from "../pages/listagens/listagens";
import PaginaLogin from "../pages/login_cadastro/login";
import PaginaCadastro from "../pages/login_cadastro/cadastro";



export default function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/clientes", element:
        <ClienteProvider>
          <DashboardCliente />,
        </ClienteProvider>
    },
    {
      path: "/produtos", element:
      <ProdutoProvider>
        <DashboardProduto />
      </ProdutoProvider>
    },
    {
      path: "/servicos", element:
      <ServicoProvider>
        <DashboardServico />
      </ServicoProvider>
    },
    {
      path: "/listagens", element:
      <PaginaListagens />
    },
    {
      path: "/", element:
      <PaginaLogin />
    },
    {
      path: "/cadastro", element:
      <PaginaCadastro />
    }

  ]);

  return (
      <>
      <RouterProvider router={router} />
      <Footer />
      </>
  );
}