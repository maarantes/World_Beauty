import React, { useState, Dispatch, SetStateAction } from 'react';
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
  nome: string;
  nome_social: string;
  genero: "Masculino" | "Feminino" | "Outro";
  cpf: number;
  produtos: ProdutosCarrinho[];
  servicos: ServicosCarrinho[];
}

interface ClienteContextType {
  Clientes: Cliente[];
  setClientes: Dispatch<SetStateAction<Cliente[]>>;
}

export const ClienteContext = React.createContext<ClienteContextType>({
  Clientes: [],
  setClientes: () => {} // função vazia
});

export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [Clientes, setClientes] = useState<Cliente[]>([
    {
      nome: "Daniel Oliveira",
      nome_social: "Daniel",
      genero: "Masculino",
      cpf: 44396793820,
      produtos: [{ produto: { nome: "Esmalte Rosa", preco: 10 }, quantidade: 5 }],
      servicos: [{ servico: { nome: "Manicure", preco: 80 }, quantidade: 2 }]
    },
    {
        nome: "Rosângela Pires",
        nome_social: "Rosa",
        genero: "Feminino",
        cpf: 12212200000,
        produtos: [{ produto: { nome: "Tinta para Cabelo", preco: 50 }, quantidade: 8 }],
        servicos: [{ servico: { nome: "Hidratação de Cabelo", preco: 40 }, quantidade: 4 }]
    }
  ]);

  return (
    <ClienteContext.Provider value={{ Clientes, setClientes }}>
      {children}
    </ClienteContext.Provider>
  );
}
