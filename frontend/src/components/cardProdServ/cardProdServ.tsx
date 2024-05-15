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
        <div className="cacli_wrapper">
            <div className="cacli_conteudo">
                <div className="cacli_conteudo_esq">
                    <div className="cacli_info cacli_mbottomzero">
                        <p><span className="cacli_bold">Nome:</span> {Nome} </p>
                        <p><span className="cacli_bold">Preço:</span> {`R$${Preco}`} </p>
                        <p><span className="cacli_bold">ID:</span> {ID} </p>
                    </div>
                </div>
                <div className="cacli_conteudo_dir">
                    <button className="cacli_botao_cima cacli_editar" onClick={abrirModalEdicao}> <img src="img/icon_editar.svg" /> </button>
                    <button className="cacli_botao_cima cacli_lixeira" onClick={() => deletarItem(ID)}> <img src="img/icon_lixeira.svg" /> </button>
                </div>
            </div>
        </div>
    );
}

export default CardProdServ;