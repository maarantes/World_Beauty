import React, { useState, useContext } from "react";
import "./dashboard.scss"
import Navbar from "../../components/navbar/navbar";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import CardProdServ from "../../components/cardProdServ/cardProdServ";
import ModalCadEdiProdServ from "../../components/modalCadEdiProdServ/modalCadEdiProdServ";
import { ServicoContext } from '../../contexts/servicoProvider';
import NotificacaoToast from "../../components/NotificacaoToast/notificacaoToast";

function DashboardServico() {
  
    const { Servicos } = useContext(ServicoContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState<"cadastro" | "edicao">("cadastro");
    const [Servico, setServico] = useState<{ID: number, nome: string, preco: number} | undefined>(undefined);

    function openModalCadastro() {
      setTipo("cadastro");
      setModalIsOpen(true);
    }

    function openModalEdicao(Servico: any) {
      setServico({
        ID: Servico.ID,
        nome: Servico.Nome,
        preco: Servico.Preco
      });
      setTipo("edicao");
      setModalIsOpen(true);
    }

    function closeModal() {
      setModalIsOpen(false);
      setServico(undefined);
    }

    return (
        <>
        <Navbar />
        <section className="margem">
    
        <h1 className="dash_titulo">Lista de Serviços</h1>
        <BotaoCTA escrito="Cadastrar Serviço" aparencia="primario" cor="verde" onClick={openModalCadastro}/>
    
          <p className="dash_resultado">
            {Servicos.length} RESULTADOS ENCONTRADOS
          </p>
    
          <div>
            {Servicos.map((Servico, index) => (
             <CardProdServ
             ID={Servico.ID}
             key={index} 
             Nome={Servico.Nome} 
             Preco={Servico.Preco}
             Tipo="serviço"
             abrirModalEdicao={() => openModalEdicao(Servico)}/>
            ))}
          </div>

          <ModalCadEdiProdServ tipo={tipo} isOpen={modalIsOpen} fecharModal={closeModal} item={Servico} categoria="serviço" />
    
          <NotificacaoToast />
          
        </section>

        </>
      );
}

export default DashboardServico;
