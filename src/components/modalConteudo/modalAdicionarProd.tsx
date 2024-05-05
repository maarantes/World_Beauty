import "./modalAdicionarProd.scss"
import Modal from 'react-modal';
import SelectAdicionarProd from "./selectAdicionarProd";
import { useState } from "react";
import BotaoCTA from "../botaoCTA/botaoCTA";

Modal.setAppElement('#root')

interface ModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
}

function ModalAdicionarProd ({ closeModal, modalIsOpen }: ModalProps) {

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
                <div className="modal_escrito">
                    <h1>Adicionar Produto</h1>
                    <p>Selecione o produto e a quantidade dele abaixo.</p>
                </div>
                <form className="modal_form">
                    <SelectAdicionarProd />
                    <input type="number" placeholder="Digite aqui..." min="1" value={value} onChange={handleChange}/>
                    <div className="modal_form_botao">
                        <BotaoCTA escrito="Enviar" aparencia="primario" />
                    </div>
                </form>
        </Modal>
    );
}

export default ModalAdicionarProd;