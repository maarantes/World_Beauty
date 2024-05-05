import React from 'react';
import "./botaoCTA.scss"
import { Link } from 'react-router-dom';

interface BotaoProps {
  link?: string;
  escrito?: string;
  aparencia: "primario" | "secundario";
  cor?: "verde" | "vermelho";
  type?: "button" | "submit";
  img?: string;
  onClick?: () => void;
}

const BotaoCTA: React.FC<BotaoProps> = ({ link, escrito, aparencia, cor, type = "button", img, onClick }) => {
    
  const aparenciaEscolhida = aparencia === "primario" ? "botao_cta_primario" : "botao_cta_secundario";
  const corEscolhida = cor ? `botao_cta_${cor}` : "";
  
  return link ? (
    <Link to={link} className={`${aparenciaEscolhida} ${corEscolhida}`}>
      {img && <img src={img} alt=""/>}
      {escrito}
    </Link>
  ) : (
    <button type={type} className={`${aparenciaEscolhida} ${corEscolhida}`} onClick={onClick}>
      {img && <img src={img} alt=""/>}
      {escrito}
    </button>
  )
}

export default BotaoCTA;