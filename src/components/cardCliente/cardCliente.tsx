import { useState } from 'react';
import "./cardCliente.scss"
import BotaoCTA from "../botaoCTA/botaoCTA";
import ModalAdicionarItem from '../modalAdicionarItem/modalAdicionarItem';

interface CardClienteProps {
    nome: string;
    nome_social: string;
    genero: string;
    cpf: number;
    produtos: { nome: string, quantidade: number }[];
    servicos: { nome: string, quantidade: number }[];
}

function CardCliente({ nome, nome_social, genero, cpf, produtos, servicos }: CardClienteProps) {

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
    function formatarCPF(cpf: number) {
        const string_CPF = String(cpf);
        const parte1 = string_CPF.slice(0, 3);
        const parte2 = string_CPF.slice(3, 6);
        const parte3 = string_CPF.slice(6, 9);
        const parte4 = string_CPF.slice(9, 11);
        return `${parte1}.${parte2}.${parte3}-${parte4}`;
    }

    return (
        <div className="cacli_wrapper">
            <div className="cacli_conteudo">
                <div className="cacli_conteudo_esq">
                    <div className="cacli_info">
                        <p><span className="cacli_bold">Nome:</span> {nome} </p>
                        <p><span className="cacli_bold">Nome social:</span> {nome_social} </p>
                        <p><span className="cacli_bold">Gênero:</span> {genero} </p>
                        <p><span className="cacli_bold">CPF:</span> {formatarCPF(cpf)} </p>
                    </div>
                </div>
                <div className="cacli_conteudo_dir">
                    <button className="cacli_botao_cima cacli_editar"> <img src="img/icon_editar.svg" /> </button>
                    <button className="cacli_botao_cima cacli_lixeira"> <img src="img/icon_lixeira.svg" /> </button>
                </div>
            </div>
            <BotaoCTA escrito={CardBaixoAberto ? "Fechar" : "Expandir"} aparencia="secundario" onClick={() => setCardBaixoAberto(!CardBaixoAberto)} />
            <div className={`cacli_baixo ${CardBaixoAberto ? 'aberto' : ''}`}>
                <hr className="cacli_divisoria" /> 
                <div className="cacli_baixo_secao">
                    <div className="cacli_baixo_secao_esq">
                        <p className="cacli_titulo">Carrinho ({produtos.length})</p>
                        {produtos.map((produto, index) => (
                        <div key={index} className="cacli_item">
                            <button className="cacli_botao_cima cacli_lixeira cacli_menor"> 
                                <img src="img/icon_lixeira.svg" /> 
                            </button>
                            <p>{produto.nome}: {produto.quantidade}</p>
                        </div>
                    ))}
                    </div>
                    <div className="cacli_baixo_secao_dir">
                    <BotaoCTA escrito="Adicionar Prod." aparencia="secundario" onClick={() => openModal("produto")} />
                    </div>
                </div>

                <hr className="cacli_divisoria" /> 

                <div className="cacli_baixo_secao">
                    <div className="cacli_baixo_secao_esq">
                        <p className="cacli_titulo">Serviços Consumidos ({servicos.length})</p>
                        {servicos.map((servico, index) => (
                        <div key={index} className="cacli_item">
                            <button className="cacli_botao_cima cacli_lixeira cacli_menor"> 
                                <img src="img/icon_lixeira.svg" /> 
                            </button>
                            <p>{servico.nome}: {servico.quantidade}</p>
                        </div>
                    ))}
                    </div>
                    <div className="cacli_baixo_secao_dir">
                    <BotaoCTA escrito="Adicionar Serv." aparencia="secundario" onClick={() => openModal("serviço")} />
                    </div>

                    
                </div>
            </div>
            
            {/* Modal adicionar produto ou serviço */}
            <ModalAdicionarItem closeModal={closeModal} modalIsOpen={modalIsOpen} tipo={tipo} />

        </div>
    );
}

export default CardCliente;