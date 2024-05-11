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

      const handleSubmit = async (event: any) => {
        event.preventDefault();
    
        if (selectedOption) {
            const itemID = selectedOption.value;
    
            try {
                await axios.post("http://localhost:5000/carrinho/adicionarProduto", {
                    clienteId: clienteID,
                    itemID,
                    quantidade: value
                });
    
                toast.success("Produto adicionado com sucesso!");
                buscarCarrinho();
                setValue("");
                closeModal();
            } catch (error) {
                console.error("Erro ao adicionar produto ao carrinho:", error);
            }
        } else {
            console.error('Nenhum produto selecionado');
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
                <form className="modal_form" onSubmit={handleSubmit}>
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
