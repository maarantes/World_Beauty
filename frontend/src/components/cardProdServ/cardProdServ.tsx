import { toast } from "react-toastify";
import "./cardProdServ.scss"
import axios from "axios";
import { useContext } from "react";
import { ProdutoContext } from "../../contexts/produtoProvider";
import { ServicoContext } from "../../contexts/servicoProvider";

interface CardProps {
    ID: number,
    Nome: string;
    Preco: number;
    abrirModalEdicao?: () => void;
    // O tipo ajudará chamara endpoints de deleção diferentes
    Tipo: "produto" | "serviço"
}

function CardProdServ({ ID, Nome, Preco, Tipo, abrirModalEdicao, }: CardProps) {

    const { buscarProdutos } = useContext(ProdutoContext);
    const { buscarServicos } = useContext(ServicoContext);
    const token = localStorage.getItem('token');

    function deletarItem(ID: number) {
        const rota = Tipo === "produto" 
            ? `http://localhost:5000/produtos/deletar/${ID}`
            : `http://localhost:5000/servicos/deletar/${ID}`;

        const autorizacao = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.delete(rota, autorizacao)
            .then(response => {
                console.log(response);
                toast.success(`${Tipo.charAt(0).toUpperCase() + Tipo.slice(1)} deletado com sucesso!`)
                // Atualizar a lista de produtos ou serviços
                if (Tipo === "produto") {
                    buscarProdutos();
                } else if (Tipo === "serviço") {
                    buscarServicos();
                }
            })
            .catch(error => {
                console.error(`Erro ao deletar ${Tipo}`, error);
            });
    return;
    }

    return (
        <div className="caps_wrapper">
            <div className="caps_conteudo">
                <div className="caps_conteudo_esq">
                    <div className="caps_info caps_mbottomzero">
                        <p><span className="caps_bold">Nome:</span> {Nome} </p>
                        <p><span className="caps_bold">Preço:</span> {`R$${Preco}`} </p>
                        <p><span className="caps_bold">ID:</span> {ID} </p>
                    </div>
                </div>
                <div className="caps_conteudo_dir">
                    <button className="caps_botao_cima caps_editar" onClick={abrirModalEdicao}> <img src="img/icon_editar.svg" /> </button>
                    <button className="caps_botao_cima caps_lixeira" onClick={() => deletarItem(ID)}> <img src="img/icon_lixeira.svg" /> </button>
                </div>
            </div>
        </div>
    );
}

export default CardProdServ;