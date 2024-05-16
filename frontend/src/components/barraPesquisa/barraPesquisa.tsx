import React, { SetStateAction, Dispatch } from 'react';
import "./barraPesquisa.scss"

interface BarraPesquisaProps {
  pesquisa: string;
  setPesquisa: Dispatch<SetStateAction<string>>;
}

const BarraPesquisa: React.FC<BarraPesquisaProps> = ({ pesquisa, setPesquisa }) => {
    
    return (
        <div className="dash_pesquisa_container">
            <img src="/img/icon_search.svg" alt="Ícone de pesquisa" />
            <input 
                className="dash_pesquisa" 
                type="text" 
                placeholder="Pesquisar por nome" 
                value={pesquisa} 
                onChange={e => setPesquisa(e.target.value)} 
            />
        </div>
    );
}

export default BarraPesquisa;
