import React, { useState, useContext } from "react";
import "./dashboard.scss"
import Navbar from "../../components/navbar/navbar";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import CardProdServ from "../../components/cardProdServ/cardProdServ";
import ModalCadEdiProdServ from "../../components/modalCadEdiProdServ/modalCadEdiProdServ";
import { ProdutoContext } from '../../contexts/produtoProvider';
import NotificacaoToast from "../../components/NotificacaoToast/notificacaoToast";

function DashboardProduto() {
  
    const { produtos } = useContext(ProdutoContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState<"cadastro" | "edicao">("cadastro");
    const [produto, setProduto] = useState<{ID: number, nome: string, preco: number} | undefined>(undefined);

    function openModalCadastro() {
      setTipo("cadastro");
      setModalIsOpen(true);
    }

    function openModalEdicao(produto: any) {
      setProduto({
        ID: produto.ID,
        nome: produto.Nome,
        preco: produto.Preco
      });
      setTipo("edicao"); // Definir o tipo para "edicao" quando o botão de editar usuário do Card Cliente for clicado
      setModalIsOpen(true);
    }

    function closeModal() {
      setModalIsOpen(false);
      setProduto(undefined);
    }

    return (
        <>
        <Navbar />
        <section className="margem">
    
        <h1 className="dash_titulo">Lista de Produtos</h1>
        <BotaoCTA escrito="Cadastrar Produto" aparencia="primario" cor="verde" onClick={openModalCadastro}/>
    
          <p className="dash_resultado">
            {produtos.length} RESULTADOS ENCONTRADOS
          </p>
    
          <div>
            {produtos.map((produto) => (
             <CardProdServ
             ID={produto.ID}
             key={produto.ID}
             Nome={produto.Nome}
             Preco={produto.Preco}
             abrirModalEdicao={() => openModalEdicao(produto)}
             />
            ))}
          </div>

          <ModalCadEdiProdServ tipo={tipo} isOpen={modalIsOpen} fecharModal={closeModal} item={produto} categoria="produto" />
    
          <NotificacaoToast />
          
        </section>

        </>
      );
}

export default DashboardProduto;
