import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface Item {
    ClienteID: number;
    ItemID: number;
    Quantidade: number;
    Nome: string;
    Tipo: "produto" | "servico";
}

interface CarrinhoContextType {
    Carrinho: Item[];
    setCarrinho: Dispatch<SetStateAction<Item[]>>;
    buscarCarrinho: () => void;
}

export const CarrinhoContext = React.createContext<CarrinhoContextType>({
    Carrinho: [],
    setCarrinho: () => {},
    buscarCarrinho: () => {}
});

export const CarrinhoProvider = (props: any) => {
    const [Carrinho, setCarrinho] = useState<Item[]>([]);
  
    const buscarCarrinho = () => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:5000/carrinho/mostrar/${props.ClienteID}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            setCarrinho(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar carrinho", error);
        });
    };
    
  
    useEffect(() => {
        buscarCarrinho();
    }, [props.ClienteID]);
  
    return (
        <CarrinhoContext.Provider value={{Carrinho, setCarrinho, buscarCarrinho}}>
            {props.children}
        </CarrinhoContext.Provider>
    );
};

