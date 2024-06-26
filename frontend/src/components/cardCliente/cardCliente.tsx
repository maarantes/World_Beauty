import { useState, useContext } from "react";
import "./cardCliente.scss"
import BotaoCTA from "../botaoCTA/botaoCTA";
import ModalAdicionarItem from "../modalAdicionarItem/modalAdicionarItem";

import axios from "axios";

import { ClienteContext } from "../../contexts/clienteProvider";
import { CarrinhoContext } from "../../contexts/carrinhoProvider";
import { toast } from "react-toastify";

interface CardClienteProps {
    ID: number;
    Nome: string;
    NomeSocial: string;
    Genero: string;
    CPF: number;
    Produtos: { Nome: string, quantidade: number }[];
    Servicos: { Nome: string, quantidade: number }[];
    // Isso chamará a função de abrir o modal multifunção no modo edição, no componente pai (dashboard)
    abrirModalEdicao: () => void;
}

function CardCliente({ ID, Nome, NomeSocial, Genero, CPF, abrirModalEdicao }: CardClienteProps) {

    const { Carrinho, setCarrinho } = useContext(CarrinhoContext);
    const { buscarCarrinho } = useContext(CarrinhoContext);
    const token = localStorage.getItem('token');

    const itensCarrinho = Carrinho.filter((item: any) => item.ClienteID === ID);

    // Abre o modal e fala se ele vai adicionar um produto ou serviço
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState("produto");

    function openModal(tipo: string) {
        setTipo(tipo)
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    // Expandir card do cliente
    const [CardBaixoAberto, setCardBaixoAberto] = useState(false);

    // Formatar CPF
    function formatarCPF(CPF: number) {
        const string_CPF = String(CPF);
        const parte1 = string_CPF.slice(0, 3);
        const parte2 = string_CPF.slice(3, 6);
        const parte3 = string_CPF.slice(6, 9);
        const parte4 = string_CPF.slice(9, 11);
        return `${parte1}.${parte2}.${parte3}-${parte4}`;
    }

    const { buscarClientes } = useContext(ClienteContext);

    function deletarCliente(ID: number) {
        axios.delete(`http://localhost:5000/clientes/deletar/${ID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            toast.success("Cliente deletado com sucesso!")
            // Atualizar lista de clientes
            buscarClientes();
        })
        .catch(error => {
            console.error("Erro ao deletar cliente", error);
        });
        return () => {};
    }
    

    function deletarProduto(ID: number, ProdutoID: number) {
        axios.delete(`http://localhost:5000/carrinho/deletarProduto/${ID}/${ProdutoID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            toast.success("Produto deletado com sucesso!")
            // Atualizar lista de clientes
            buscarCarrinho();
        })
        .catch(error => {
            console.error("Erro ao deletar produto", error);
        });
    }
    
    function deletarServico(ID: number, ServicoID: number) {
        axios.delete(`http://localhost:5000/carrinho/deletarServico/${ID}/${ServicoID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            toast.success("Serviço deletado com sucesso!")
            // Atualizar lista de clientes
            buscarCarrinho();
        })
        .catch(error => {
            console.error("Erro ao deletar serviço", error);
        });
    }
    

    return (
        
        <>
        <div className="cacli_wrapper">
            <div className="cacli_conteudo">
                <div className="cacli_conteudo_esq">
                    <div className="cacli_info">
                        <p><span className="cacli_bold">Nome:</span> {Nome} </p>
                        <p><span className="cacli_bold">Nome social:</span> {NomeSocial} </p>
                        <p><span className="cacli_bold">Gênero:</span> {Genero} </p>
                        <p><span className="cacli_bold">CPF:</span> {formatarCPF(CPF)} </p>
                        <p><span className="cacli_bold">ID:</span> {ID} </p>
                    </div>
                </div>
                <div className="cacli_conteudo_dir">
                <button className="cacli_botao_cima cacli_editar" onClick={abrirModalEdicao}> <img src="img/icon_editar.svg" /> </button>
                <button className="cacli_botao_cima cacli_lixeira" onClick={() => deletarCliente(ID)}> <img src="img/icon_lixeira.svg" /> </button>
                </div>
            </div>
            <BotaoCTA escrito={CardBaixoAberto ? "Fechar" : "Expandir"} aparencia="secundario" onClick={() => setCardBaixoAberto(!CardBaixoAberto)} />
            <div className={`cacli_baixo ${CardBaixoAberto ? 'aberto' : ''}`}>
                <hr className="cacli_divisoria" /> 
                <div className="cacli_baixo_secao">
                    <div className="cacli_baixo_secao_esq">
                        <p className="cacli_titulo">Carrinho ({itensCarrinho.filter(item => item.Tipo === "produto").length})</p>
                        {itensCarrinho.map((item, index) => {
                        if (item.Tipo === "produto") {
                            return (
                            <div key={index} className="cacli_item">
                                <button className="cacli_botao_cima cacli_lixeira cacli_menor" onClick={() => deletarProduto(ID, item.ItemID)}> <img src="img/icon_lixeira.svg" /> </button>
                                <p>{item.Nome}: {item.Quantidade}</p>
                            </div>
                        );
                    }
                    })}
                    </div>
                    <div className="cacli_baixo_secao_dir">
                    <BotaoCTA escrito="Adicionar Prod." aparencia="secundario" onClick={() => openModal("produto")} />
                    </div>
                </div>

                <hr className="cacli_divisoria" /> 

                <div className="cacli_baixo_secao">
                    <div className="cacli_baixo_secao_esq">
                        <p className="cacli_titulo">Serviços Consumidos ({itensCarrinho.filter(item => item.Tipo === "servico").length})</p>
                        {itensCarrinho.map((item, index) => {
                        if (item.Tipo === "servico") {
                            return (
                            <div key={index} className="cacli_item">
                                <button className="cacli_botao_cima cacli_lixeira cacli_menor" onClick={() => deletarServico(ID, item.ItemID)}> <img src="img/icon_lixeira.svg" /> </button>
                                <p>{item.Nome}: {item.Quantidade}</p>
                            </div>
                        );
                    }
                    })}
                    </div>
                    <div className="cacli_baixo_secao_dir">
                    <BotaoCTA escrito="Adicionar Serv." aparencia="secundario" onClick={() => openModal("serviço")} />
                    </div>                    
                </div>
            </div>
            
            {/* Modal adicionar produto ou serviço */}
            <ModalAdicionarItem closeModal={closeModal} modalIsOpen={modalIsOpen} tipo={tipo} clienteID={ID} />

        </div>
        </>
    );
}

export default CardCliente;