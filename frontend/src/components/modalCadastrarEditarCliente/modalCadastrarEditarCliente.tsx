import { useContext, useEffect, useState } from "react";
import BotaoCTA from "../botaoCTA/botaoCTA";
import Modal from 'react-modal';
import "./modalCadastrarEditarCliente.scss"
import Select from "react-select";

import axios from 'axios';
import { toast } from "react-toastify";
import { ClienteContext } from "../../contexts/clienteProvider";

Modal.setAppElement('#root')

interface BotaoModalProps {
    tipo: "cadastro" | "edicao";
    isOpen: boolean;
    fecharModal: () => void;
    usuario?: {
        ID: number;
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

    const { buscarClientes } = useContext(ClienteContext);
    const token = localStorage.getItem('token');

    // Caso abrir o modal no modo edição ele vai pegar as informações do usuário
    const [ID, setID] = useState<number>();
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
        setID(usuario?.ID || undefined);
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

    // Código react-modal
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

    //O form do modal vai chamar esta função com este endpoint quando ele estiver no modo edição
    function editarCliente(cliente: any) {
        axios.put(`http://localhost:5000/clientes/editar/${ID}`, cliente, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                fecharModal();
                toast.success("Cliente editado com sucesso!");
                // Atualizar lista de clientes
                buscarClientes();
            })
            .catch(error => {
                toast.warning("Ocorreu um erro ao editar o cliente!");
            });
    }

    //Se estiver no modo cadastro chama o endpoint do cadastro caso contrário chama o endpoint acima
    function handleSubmit(event: any) {
        event.preventDefault();

        if (!nome || !nomeSocial || !selectedOption || !cpf) {
            toast.warning("Preencha todos os campos!");
            return;
        }

        if (cpf.length !== 11) {
            toast.warning("Complete o CPF!");
            return;
        }

        const contemNumero = /\d/;
        if (contemNumero.test(nome) || contemNumero.test(nomeSocial)) {
            toast.warning("Nome e Nome Social não podem conter números!");
        return;
    }
    
        const cliente = {
            ID: ID,
            Nome: nome,
            NomeSocial: nomeSocial,
            Genero: selectedOption ? selectedOption.value : "Outro",
            CPF: Number(cpf)
        };

        if (tipo === "cadastro") {
            axios.post("http://localhost:5000/clientes/cadastrar", cliente, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data);
                    fecharModal();
                    toast.success("Cliente cadastrado com sucesso!");
                    // Atualizar lista de clientes
                    buscarClientes();

                    // Limpar os campos
                    setNome("");
                    setNomeSocial("");
                    setSelectedOption(null);
                    setCpf("");
                })
                .catch(error => {
                    toast.warning("O nome ou CPF já estão cadastrados!");
                });

    } else if (tipo === "edicao") {
        editarCliente(cliente);
    }}
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
                <form className="modalcad_form" onSubmit={handleSubmit} noValidate>
                    <div className="modalcad_form_item">
                        <p>Nome:</p>
                        <input type="text" placeholder="Digite aqui..." value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div className="modalcad_form_item">
                        <p>Nome social:</p>
                        <input type="text" placeholder="Digite aqui..." value={nomeSocial} onChange={e => setNomeSocial(e.target.value)}/>
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
                        <input type="text" placeholder="Digite aqui..." value={cpf} pattern="\d*" minLength={11} maxLength={11} onChange={e => setCpf(e.target.value)}/>
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