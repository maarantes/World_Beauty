import { useContext, useState } from "react";
import "./modalAdicionarItem.scss"
import SelectAdicionarItem from "./selectAdicionarItem";
import BotaoCTA from "../botaoCTA/botaoCTA";
import Modal from 'react-modal';

import { ProdutoProvider } from "../../contexts/produtoProvider";
import { ServicoProvider } from "../../contexts/servicoProvider";
import { CarrinhoContext } from "../../contexts/carrinhoProvider";

import axios from "axios";
import { toast } from "react-toastify";

Modal.setAppElement('#root')

interface ModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
    tipo: string;
    clienteID: number;
}

export interface OpcaoProps {
    value: number;
    nome: string;
  }

function ModalAdicionarItem ({ closeModal, modalIsOpen, tipo, clienteID }: ModalProps) {

    const { buscarCarrinho } = useContext(CarrinhoContext);
    const token = localStorage.getItem('token');

    // Input de número
    const [value, setValue] = useState("");
    const [selectedOption, setSelectedOption] = useState<OpcaoProps | null>(null);

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

      const handleSubmit = async (event: any, tipo: string) => {
        event.preventDefault();

        if (!value) {
            toast.warning("Preencha a quantidade!");
            return;
        }
    
        if (selectedOption) {
            const itemID = selectedOption.value;
            let endpoint = "";
    
            // Decide o endpoint baseado no tipo
            if (tipo === "produto") {
                endpoint = "adicionarProduto";
            } else if (tipo === "serviço") {
                endpoint = "adicionarServico";
            } else {
                console.error('Tipo de item desconhecido:', tipo);
                return;
            }
    
            try {
                await axios.post(`http://localhost:5000/carrinho/${endpoint}`, {
                    clienteId: clienteID,
                    itemID,
                    quantidade: value
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
                toast.success(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} adicionado com sucesso!`);
                buscarCarrinho();
                setValue("");
                closeModal();
            } catch (error) {
                console.error(`Erro ao adicionar ${tipo} ao carrinho:`, error);
            }
        } else {
            console.error('Nenhum item selecionado');
        }
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
                <form className="modal_form" onSubmit={(event) => handleSubmit(event, tipo)}>
                    <SelectAdicionarItem tipo={tipo} setSelectedOption={setSelectedOption} />
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

export default ModalAdicionarItem;
