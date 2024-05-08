import React, { useState, Dispatch, SetStateAction } from 'react';

export interface Produto {
  nome: string;
  preco: number;
}

interface ProdutoContextType {
  produtos: Produto[];
  setProdutos: Dispatch<SetStateAction<Produto[]>>;
}

export const ProdutoContext = React.createContext<ProdutoContextType>({
    produtos: [],
    setProdutos: () => {} // função vazia
});

export function ProdutoProvider({ children }: { children: React.ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      nome: "Maquiagem",
      preco: 70
    },
    {
      nome: "Esmalte Esmeralda",
      preco: 80
    },
    {
      nome: "Escova",
      preco: 50
    },
    {
      nome: "Tinta para cabelo",
      preco: 40
    }

  ]);

  return (
    <ProdutoContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProdutoContext.Provider>
  );
}
