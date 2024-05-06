import React, { useState, Dispatch, SetStateAction } from 'react';

interface Servico {
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
      nome: "Corte de Cabelo",
      preco: 100
    },
    {
      nome: "Hidratação de Sobrancelhas",
      preco: 25
    },
    {
      nome: "Manicure",
      preco: 80
    },
    {
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
