import { useContext, useEffect, useState } from "react";
import BotaoCTA from "../botaoCTA/botaoCTA";
import Modal from 'react-modal';
import "./modalCadEdiProdServ.scss"

import axios from "axios";
import { toast } from "react-toastify";
import { ProdutoContext } from "../../contexts/produtoProvider";
import { ServicoContext } from "../../contexts/servicoProvider";

Modal.setAppElement('#root')

interface modalCadEdiProdServProps {
    tipo: "cadastro" | "edicao";
    isOpen: boolean;
    fecharModal: () => void;
    item?: {
        ID: number,
        nome: string;
        preco: number;
    };
    categoria: "produto" | "serviço";
}

function ModalCadEdiProdServ ({ tipo, isOpen, fecharModal, item, categoria}: modalCadEdiProdServProps) {

    const { buscarProdutos } = useContext(ProdutoContext);
    const { buscarServicos } = useContext(ServicoContext);

    // Caso abrir o modal no modo edição ele vai pegar as informações do item ou serviço

    const [ID, setID] = useState<number>();
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");

    // Atualizar os estados quando a prop "item" mudar
    useEffect(() => {
        setID(item?.ID || undefined);
        setNome(item?.nome || "");
        setPreco(item && item.preco ? item.preco.toString() : "");
    }, [item]);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModal() {
        setModalIsOpen(false);
    }

    const estiloModal = {
        content: {
          width: '50%',
          height: '60%',
          margin: 'auto',
          padding: "32px"
        },
    };

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (!preco.includes(".")) {
            toast.warning("Inclua os centavos no preço!");
            return;
        }
    
        const item = {
            Nome: nome,
            Preco: preco
        };
    
        try {

            if (tipo === "cadastro" && categoria === "produto") {
                const response = await axios.post("http://localhost:5000/cadastrarProdutos", item);
                toast.success("Produto cadastrado com sucesso!");
            } 
            
            else if (tipo === "edicao" && categoria === "produto") {
                const response = await axios.put(`http://localhost:5000/editarProduto/${ID}`, item);
                toast.success("Produto editado com sucesso!");
            }

            else if (tipo === "cadastro" && categoria === "serviço") {
                const response = await axios.post("http://localhost:5000/cadastrarServicos", item);
                toast.success("Serviço cadastrado com sucesso!");
            }

            else if (tipo === "edicao" && categoria === "serviço") {
                const response = await axios.put(`http://localhost:5000/editarServico/${ID}`, item);
                toast.success("Serviço editado com sucesso!");
            }

            fecharModal();
            // Atualizar lista de produtos ou serviços
            if (categoria === "produto") {
                buscarProdutos();
            } else if (categoria === "serviço") {
                buscarServicos();
            }

        } catch (error) {
            console.error("Erro ao processar produto!", error);
        }
    }
      
    return (
        <>

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={estiloModal}
                >
                <div className="modalcad_escrito">
                    {/* Deixar primeira letra da categoria em maiúsculo*/}
                    <h1>{tipo === 'edicao' ? `Editar ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}` 
                    : `Cadastrar ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`}</h1>
                    <p>Preencha as informações abaixo.</p>
                </div>
                <form className="modalcad_form" onSubmit={handleSubmit}>
                    <div className="modalcad_form_item">
                        <p>Nome:</p>
                        <input type="text" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div className="modalcad_form_item">
                        <p>Preço (em reais):</p>
                        <input type="number" placeholder="Digite aqui..." value={preco} onChange={e => setPreco((e.target.value))}/>
                    </div>
                    <div className="modalcad_form_botao">
                        <BotaoCTA type="submit" escrito="Enviar" aparencia="primario" />
                        <BotaoCTA escrito="Fechar" aparencia="secundario" onClick={fecharModal} />
                    </div>
                </form>
        </Modal>
        </>
    )
}

export default ModalCadEdiProdServ;