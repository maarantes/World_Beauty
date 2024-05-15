import axios from 'axios';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';

export interface Servico {
  ID: number;
  Nome: string;
  Preco: number;
}

interface ServicoContextType {
  Servicos: Servico[];
  setServicos: Dispatch<SetStateAction<Servico[]>>;
  buscarServicos: () => void;
}

export const ServicoContext = React.createContext<ServicoContextType>({
    Servicos: [],
    setServicos: () => {},
    buscarServicos: () => {}
});

export function ServicoProvider({ children }: { children: React.ReactNode }) {
  const [Servicos, setServicos] = useState<Servico[]>([]);
    
    const buscarServicos = () => {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:5000/servicos/mostrar", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
          setServicos(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar serviços", error);
        });
    };
  
    useEffect(buscarServicos, []);


  return (
    <ServicoContext.Provider value={{ Servicos, setServicos, buscarServicos }}>
      {children}
    </ServicoContext.Provider>
  );
}
