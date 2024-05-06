import { useState } from 'react';
import "./cardProduto.scss"

interface CardProdutoProps {
    nome: string;
    preco: number;
    abrirModalEdicao?: () => void;
}

function CardProduto({ nome, preco, abrirModalEdicao }: CardProdutoProps) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState("produto");

    function openModal(tipo: string) {
        setTipo(tipo)
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div className="cacli_wrapper">
            <div className="cacli_conteudo">
                <div className="cacli_conteudo_esq">
                    <div className="cacli_info cacli_mbottomzero">
                        <p><span className="cacli_bold">Nome:</span> {nome} </p>
                        <p><span className="cacli_bold">Preço:</span> {`${preco}R$`} </p>
                    </div>
                </div>
                <div className="cacli_conteudo_dir">
                <button className="cacli_botao_cima cacli_editar" onClick={abrirModalEdicao}> <img src="img/icon_editar.svg" /> </button>
                    <button className="cacli_botao_cima cacli_lixeira"> <img src="img/icon_lixeira.svg" /> </button>
                </div>
            </div>
        </div>
    );
}

export default CardProduto;