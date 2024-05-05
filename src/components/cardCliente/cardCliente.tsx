import { useState } from 'react';
import "./cardCliente.scss"
import BotaoCTA from "../botaoCTA/botaoCTA";

interface CardClienteProps {
    nome: string;
    nome_social: string;
    genero: string;
    cpf: number;
    produtos: { nome: string, quantidade: number }[];
    servicos: { nome: string, quantidade: number }[];
}

function CardCliente({ nome, nome_social, genero, cpf, produtos, servicos }: CardClienteProps) {

    const [CardBaixoAberto, setCardBaixoAberto] = useState(false);

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
                    </div>
                    <div className="cacli_info">
                        <p><span className="cacli_bold">Nome social:</span> {nome_social} </p>
                    </div>
                    <div className="cacli_info">
                        <p><span className="cacli_bold">Gênero:</span> {genero} </p>
                    </div>
                    <div className="cacli_info">
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
                        <BotaoCTA escrito="Adicionar Prod." aparencia="secundario" />
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
                        <BotaoCTA escrito="Adicionar Serv." aparencia="secundario" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardCliente;