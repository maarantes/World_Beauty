import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios';

export interface Produto {
  ID: number,
  Nome: string;
  Preco: number;
}

interface ProdutoContextType {
  produtos: Produto[];
  setProdutos: Dispatch<SetStateAction<Produto[]>>;
  buscarProdutos: () => void;
}

export const ProdutoContext = React.createContext<ProdutoContextType>({
    produtos: [],
    setProdutos: () => {},
    buscarProdutos: () => {}
});

export function ProdutoProvider({ children }: { children: React.ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

    const buscarProdutos = () => {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:5000/produtos/mostrar", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
          setProdutos(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar produtos", error);
        });
    };
  
    useEffect(buscarProdutos, []);


  return (
    <ProdutoContext.Provider value={{ produtos, setProdutos, buscarProdutos }}>
      {children}
    </ProdutoContext.Provider>
  );
}
