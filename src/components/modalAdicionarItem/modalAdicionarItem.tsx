import { useState } from "react";
import "./modalAdicionarItem.scss"
import SelectAdicionarItem from "./selectAdicionarItem";
import BotaoCTA from "../botaoCTA/botaoCTA";

import Modal from 'react-modal';

import { ProdutoProvider } from "../../contexts/produtoProvider";
import { ServicoProvider } from "../../contexts/servicoProvider";

Modal.setAppElement('#root')

interface ModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
    tipo: string;
}

function ModalAdicionarProd ({ closeModal, modalIsOpen, tipo }: ModalProps) {

    // Input de número
    const [value, setValue] = useState('');

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    const customStyles = {
        content: {
          width: '50%',
          height: '60%',
          margin: 'auto',
          padding: "32px"
        },
      };
    
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
                >
                <ProdutoProvider> {/* Importar a lista de produtos */}
                <ServicoProvider> {/* Importar a lista de serviços */}
                <div className="modal_escrito">
                    <h1>Adicionar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h1>
                    <p>Selecione o {tipo} e a quantidade abaixo.</p>
                </div>
                <form className="modal_form">
                    <SelectAdicionarItem tipo={tipo} />
                    <input type="number" placeholder="Digite aqui..." min="1" value={value} onChange={handleChange}/>
                    <div className="modal_form_botao">
                        <BotaoCTA type="submit" escrito="Enviar" aparencia="primario" />
                        <BotaoCTA escrito="Fechar" aparencia="secundario" onClick={closeModal} />
                    </div>
                </form>
                </ServicoProvider>
                </ProdutoProvider>
        </Modal>
    );
}

export default ModalAdicionarProd;
