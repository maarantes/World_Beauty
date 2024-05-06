import { useEffect, useState } from "react";
import BotaoCTA from "../botaoCTA/botaoCTA";
import Modal from 'react-modal';
import "./modalCadEdiProdServ.scss"

Modal.setAppElement('#root')

interface modalCadEdiProdServProps {
    tipo: "cadastro" | "edicao";
    isOpen: boolean;
    fecharModal: () => void;
    produto?: {
        nome: string;
        preco: number;
    };
}

function ModalCadEdiProdServ ({ tipo, isOpen, fecharModal, produto }: modalCadEdiProdServProps) {

    // Caso abrir o modal no modo edição ele vai pegar as informações do usuário
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");

    // Atualizar os estados quando a prop "produto" mudar
    useEffect(() => {
        setNome(produto?.nome || "");
        setPreco(produto?.preco.toString() || "");
    }, [produto]);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

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

    function handleSubmit(event: any) {
        event.preventDefault();
        // Colocar backend aqui depois
    }
      
    return (
        <>

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={estiloModal}
                >
                <div className="modalcad_escrito">
                    <h1>{tipo === 'edicao' ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
                    <p>Preencha as informações abaixo.</p>
                </div>
                <form className="modalcad_form" onSubmit={handleSubmit}>
                    <div className="modalcad_form_item">
                        <p>Nome:</p>
                        <input type="text" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div className="modalcad_form_item">
                        <p>Preço (em reais):</p>
                        <input type="number" placeholder="Digite aqui..." value={preco} onChange={e => setPreco(e.target.value)}/>
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