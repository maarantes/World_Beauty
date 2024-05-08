import { useEffect, useState } from "react";
import BotaoCTA from "../botaoCTA/botaoCTA";
import Modal from 'react-modal';
import "./modalCadastrarEditarCliente.scss"
import Select from "react-select";

import axios from 'axios';

Modal.setAppElement('#root')

interface BotaoModalProps {
    tipo: "cadastro" | "edicao";
    isOpen: boolean;
    fecharModal: () => void;
    usuario?: {
        nome: string;
        nome_social: string;
        genero: string;
        cpf: number;
    };
}

// o MenuPortal serve para sobrepor o menu do select em frente ao modal
const estiloSelect = {
    control: (base: any, state: any) => ({
      ...base,
      width: 320
    })
  };

  function ModalCadastrarEditarCliente ({ tipo, isOpen, fecharModal, usuario }: BotaoModalProps) {

    // Caso abrir o modal no modo edição ele vai pegar as informações do usuário
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [genero, setGenero] = useState("");
    const [cpf, setCpf] = useState("");

    const opcoes = [
        { value: "Masculino", label: "Masculino" },
        { value: "Feminino", label: "Feminino" },
        { value: "Outro", label: "Outro" },
      ];

    //Abrir select já com o gênero do usuário se estiver no modo edição
    const generoUsuario = opcoes.find(opcao => opcao.value === usuario?.genero);
    const [selectedOption, setSelectedOption] = useState(generoUsuario || null);

    // Atualizar os estados quando a prop "usuário" mudar
    useEffect(() => {
        setNome(usuario?.nome || "");
        setNomeSocial(usuario?.nome_social || "");
        setGenero(usuario?.genero || "");
        setCpf(usuario?.cpf.toString() || "");
        //Mudar a opção selecionada do select de gênero sempre que o modal for reaberto
        const generoUsuario = opcoes.find(opcao => opcao.value === usuario?.genero);
        setSelectedOption(generoUsuario || null);
    }, [usuario]);

    const handleChange = (option: any) => {
        setSelectedOption(option);
    };

    //Guardar escolha do select
    
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
    
        const cliente = {
            Nome: nome,
            NomeSocial: nomeSocial,
            Genero: selectedOption ? selectedOption.value : "Outro",
            CPF: cpf
        };
        axios.post("http://localhost:5000/cadastrarCliente", cliente)
            .then(response => {
                console.log(response.data);
                fecharModal();
            })
            .catch(error => {
                console.error("Erro ao cadastrar cliente", error);
            });
    }
      
    return (
        <>

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={estiloModal}
                >
                <div className="modalcad_escrito">
                    <h1>{tipo === 'edicao' ? 'Editar Cliente' : 'Cadastrar Cliente'}</h1>
                    <p>Preencha as informações abaixo.</p>
                </div>
                <form className="modalcad_form" onSubmit={handleSubmit}>
                    <div className="modalcad_form_item">
                        <p>Nome:</p>
                        <input type="text" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div className="modalcad_form_item">
                        <p>Nome social:</p>
                        <input type="text" pattern="[A-Za-z\s]*" placeholder="Digite aqui..." value={nomeSocial} onChange={e => setNomeSocial(e.target.value)}/>
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
                        <input type="number" placeholder="Digite aqui..." value={cpf} onChange={e => setCpf(e.target.value)}/>
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

export default ModalCadastrarEditarCliente;