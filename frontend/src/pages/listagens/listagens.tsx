import React, { useEffect, useState } from "react";
import "./listagens.scss"
import Navbar from "../../components/navbar/navbar";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import axios from "axios";
import Select from "react-select";

import { jwtDecode } from "jwt-decode";

interface Cliente {
    Nome: string;
    ClienteID: number;
    Total: string;
}

function PaginaListagens() {

    useEffect(() => {
        document.title = "World Beauty | Listagens";
    }, []);

    const token = localStorage.getItem("token");

    // Decodificar o token e pegar o ID do usuário
    let UsuarioID: number;
    if (token) {
        const decodedToken = jwtDecode(token) as { [key: string]: any };
        UsuarioID = decodedToken["id"];
    }

    // Lista de Clientes
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const [titulo, setTitulo] = useState("OUTPUT");
    const [MostrarTabela, setMostrarTabela] = useState(false);
    const [TextoCabecalho, setTextoCabecalho] = useState("");

    const [Genero, setGenero] = useState("");

    // Mudar a tabela para 3 colunas se ela for de produtos famosos
    const [TabelaProdutosGenero, setTabelaProdutosGenero] = useState(false);

    // Colocar prefixo R$ se a tabela for de valor
    const [TabelaValor, setTabelaValor] = useState(false);


    const buscarTopClientesMais = async (UsuarioID: number, Ordem: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/listagens/topClientesQTD/${Ordem}/${UsuarioID}`, {
                headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
            setClientes(response.data);
            setMostrarTabela(true);
            setTextoCabecalho("Quantidade");
            setTitulo("OUTPUT: Top 10 clientes que mais consumiram em quantidade");
            setTabelaProdutosGenero(false);
            setTabelaValor(false)
        } catch (error) {
            console.error("Erro ao buscar os clientes:", error);
        }
    };


    const buscarTopClientesMenos = async (UsuarioID: number, Ordem: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/listagens/topClientesQTD/${Ordem}/${UsuarioID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setClientes(response.data);
            setMostrarTabela(true);
            setTextoCabecalho("Quantidade");
            setTitulo("OUTPUT: Top 10 clientes que menos consumiram em quantidade");
            setTabelaProdutosGenero(false);
            setTabelaValor(false)
        } catch (error) {
            console.error("Erro ao buscar os clientes:", error);
        }
    };
    

    const buscarTopClientesValor = async (UsuarioID: any) => {
        try {
            const response = await axios.get(`http://localhost:5000/listagens/topClientesValor/${UsuarioID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setClientes(response.data);
            setMostrarTabela(true);
            setTextoCabecalho("Valor total");
            setTitulo("OUTPUT: Top 05 clientes que mais consumiram em valor");
            setTabelaProdutosGenero(false);
            setTabelaValor(true)
        } catch (error) {
            console.error("Erro ao buscar os clientes:", error);
        }
    };

    const buscarTopProdutosGenero = async (genero: string, UsuarioID: any) => {
        try {
            
            const response = await axios.get(`http://localhost:5000/listagens/topProdutos/${genero}/${UsuarioID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
            // Armazene os dados no estado
            setClientes(response.data);
            setMostrarTabela(true);
            setTextoCabecalho("Quantidade");
            let generoLetraMaiuscula = genero.charAt(0).toUpperCase() + genero.slice(1);
            setTitulo(`OUTPUT: Produtos mais famosos do gênero ${generoLetraMaiuscula}`);
            setTabelaProdutosGenero(true);
            setTabelaValor(false)
        } catch (error) {
            console.error("Erro ao buscar os produtos:", error);
        }
    };

    //Select de Gênero

    const OpcoesGenero = [
        { value: 'tudo', label: 'Tudo' },
        { value: 'masculino', label: 'Masculino' },
        { value: 'feminino', label: 'Feminino' },
        { value: 'outro', label: 'Outro' },
    ];
    

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            width: 256
        }),
        menu: (base: any) => ({
            ...base,
            width: 256
        }),
    };

    const handleChange = (option: any) => {
        setGenero(option);
        buscarTopProdutosGenero(option.value, UsuarioID);
    };

    return (
        <>
        <Navbar />
        <section className="margem">
            <h1 className="dash_titulo">Listagens</h1>

            <div className="list_botao">
                <div>
                <BotaoCTA escrito="Top 10 clientes que mais consumiram em quantidade" aparencia="secundario" onClick={() => buscarTopClientesMais(UsuarioID, "Mais")}  />
                </div>
                <div>
                <BotaoCTA escrito="Top 10 clientes que menos consumiram em quantidade" aparencia="secundario" onClick={() => buscarTopClientesMenos(UsuarioID, "Menos")}  />
                </div>
                <div>
                <BotaoCTA escrito="Top 05 clientes que mais consumiram em valor" aparencia="secundario" onClick={() => buscarTopClientesValor(UsuarioID)} />
                </div>
                <div>
                <p className="list_botao_genero">Produtos mais famosos por gênero</p>
                <Select
                    onChange={handleChange}
                    options={OpcoesGenero}
                    placeholder="Pesquisar"
                    styles={customStyles}
                />

                </div>
            </div>

        <div className="list_output">
            <hr className="list_hr" />
            <p className="list_output_titulo">{titulo}</p>

            <table className="list_tabela">
        {MostrarTabela && (
        <thead>
            <tr>
                <th>Posição</th>
                <th>Nome</th>
                {TabelaProdutosGenero ? (
                    <th>{TextoCabecalho}</th>
                ) : (
                    <>
                        <th>ID</th>
                        <th>{TextoCabecalho}</th>
                    </>
                )}
            </tr>
        </thead>
        )}
        
        <tbody>
        {clientes.map((cliente, index) => (
        <tr key={index}>
            <td style={{width: "10%"}}>{index + 1}</td>
            <td style={{width: "30%"}}>{cliente.Nome}</td>
            {TabelaProdutosGenero ? (
                <td style={{width: "30%"}}>{cliente.Total}</td>
            ) : (
                <>
                    <td style={{width: "30%"}}>{cliente.ClienteID}</td>
                    {TabelaValor ? (
                        <td style={{width: "30%"}}>{`R$${cliente.Total}`}</td>
                    ) : (
                        <td style={{width: "30%"}}>{cliente.Total}</td>
                    )}
                </>
                )}
            </tr>
        ))}
    </tbody>

    </table>
        </div>

    </section>
    </>
  
  );
}

export default PaginaListagens;