import { useState } from "react";
import BotaoCTA from "../botaoCTA/botaoCTA";
import Modal from 'react-modal';
import "./botaoModalCadastrarCliente.scss"
import Select from "react-select";

Modal.setAppElement('#root')

// o MenuPortal serve para sobrepor o menu do select em frente ao modal
const estiloSelect = {
    control: (base: any, state: any) => ({
      ...base,
      width: 320
    })
  };

function BotaoModalCadastrarCliente () {

    const opcoes = [
        { value: "masculino", label: "Masculino" },
        { value: "feminino", label: "Feminino" },
        { value: "outro", label: "Outro" },
      ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option: any) => {
        setSelectedOption(option);
    };

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
          height: '80%',
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

        <BotaoCTA escrito="Cadastrar Cliente" aparencia="primario" cor="verde" onClick={() => openModal()}/>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={estiloModal}
                >
                <div className="modalcad_escrito">
                    <h1>Cadastrar Cliente</h1>
                    <p>Preencha as informações abaixo.</p>
                </div>
                <form className="modalcad_form" onSubmit={handleSubmit}>
                    <div className="modalcad_form_item">
                        <p>Nome:</p>
                        <input type="text" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." />
                    </div>
                    <div className="modalcad_form_item">
                        <p>Nome social:</p>
                        <input type="text" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." />
                    </div>
                    <div className="modalcad_form_item">
                        <p>Gênero:</p>
                        <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={opcoes}
                        placeholder="Clique para escolher"
                        styles={estiloSelect}
                        />
                    </div>
                    <div className="modalcad_form_item">
                        <p>CPF:</p>
                        <input type="number" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." />
                    </div>
                    <div className="modalcad_form_botao">
                        <BotaoCTA type="submit" escrito="Enviar" aparencia="primario" />
                        <BotaoCTA escrito="Fechar" aparencia="secundario" onClick={closeModal} />
                    </div>
                </form>
        </Modal>
        </>
    )
}

export default BotaoModalCadastrarCliente;