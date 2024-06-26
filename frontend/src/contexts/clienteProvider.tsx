import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Produto } from "./produtoProvider";
import { Servico } from "./servicoProvider";

interface ProdutosCarrinho {
  produto: Produto;
  quantidade: number;
}

interface ServicosCarrinho {
  servico: Servico;
  quantidade: number;
}

interface Cliente {
  ID: number;
  Nome: string;
  NomeSocial: string;
  Genero: "Masculino" | "Feminino" | "Outro";
  CPF: number;
  Produtos: ProdutosCarrinho[];
  Servicos: ServicosCarrinho[];
}

interface ClienteContextType {
  Clientes: Cliente[];
  setClientes: Dispatch<SetStateAction<Cliente[]>>;
  buscarClientes: () => void;
}

export const ClienteContext = React.createContext<ClienteContextType>({
  Clientes: [],
  setClientes: () => {},
  buscarClientes: () => {}
});

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [Clientes, setClientes] = useState<Cliente[]>([]);

  const buscarClientes = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/clientes/mostrar", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar clientes", error);
      });
  };

  useEffect(buscarClientes, []);

  return (
    <ClienteContext.Provider value={{ Clientes, setClientes, buscarClientes }}>
      {children}
    </ClienteContext.Provider>
  );
}