import { toast } from "react-toastify";
import "./cardProdServ.scss"
import axios from "axios";
import { useContext } from "react";
import { ProdutoContext } from "../../contexts/produtoProvider";

interface CardProps {
    ID: number,
    Nome: string;
    Preco: number;
    abrirModalEdicao?: () => void;
}

function CardServProd({ ID, Nome, Preco, abrirModalEdicao }: CardProps) {

    const { buscarProdutos } = useContext(ProdutoContext);

    function deletarProduto(ID: number) {
        axios.delete(`http://localhost:5000/deletarProduto/${ID}`)
            .then(response => {
                console.log(response);
                toast.success("Produto deletado com sucesso!")
                // Atualizar lista de produtos
                buscarProdutos();
            })
            .catch(error => {
                console.error("Erro ao deletar produto", error);
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
                    <button className="cacli_botao_cima cacli_lixeira" onClick={() => deletarProduto(ID)}> <img src="img/icon_lixeira.svg" /> </button>
                </div>
            </div>
        </div>
    );
}

export default CardServProd;