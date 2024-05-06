import React, { useState, Dispatch, SetStateAction } from 'react';

interface Produto {
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
      nome: "Corte de Cabelo",
      preco: 70
    },
    {
      nome: "Manicure",
      preco: 80
    }
  ]);

  return (
    <ProdutoContext.Provider value={{ produtos, setProdutos }}>
      {children}
    </ProdutoContext.Provider>
  );
}
