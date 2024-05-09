import React, { useState, Dispatch, SetStateAction } from 'react';

export interface Servico {
  ID: number;
  nome: string;
  preco: number;
}

interface ServicoContextType {
  Servicos: Servico[];
  setServicos: Dispatch<SetStateAction<Servico[]>>;
}

export const ServicoContext = React.createContext<ServicoContextType>({
    Servicos: [],
    setServicos: () => {} // função vazia
});

export function ServicoProvider({ children }: { children: React.ReactNode }) {
  const [Servicos, setServicos] = useState<Servico[]>([
    {
      ID: 1,
      nome: "Corte de Cabelo",
      preco: 100
    },
    {
      ID: 2,
      nome: "Hidratação de Sobrancelhas",
      preco: 25
    },
    {
      ID: 3,
      nome: "Manicure",
      preco: 80
    },
    {
      ID: 4,
      nome: "Sessão SPA",
      preco: 50
    }

  ]);

  return (
    <ServicoContext.Provider value={{ Servicos, setServicos }}>
      {children}
    </ServicoContext.Provider>
  );
}
