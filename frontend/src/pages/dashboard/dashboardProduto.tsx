import React, { useState, useContext } from "react";
import "./dashboard.scss"
import Navbar from "../../components/navbar/navbar";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import CardProdServ from "../../components/cardProdServ/cardProdServ";
import ModalCadEdiProdServ from "../../components/modalCadEdiProdServ/modalCadEdiProdServ";
import { ProdutoContext } from '../../contexts/produtoProvider';

function DashboardProduto() {
    const { produtos } = useContext(ProdutoContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState<"cadastro" | "edicao">("cadastro");
    const [produto, setProduto] = useState<{nome: string, preco: number} | undefined>(undefined);

    function openModalCadastro() {
      setTipo("cadastro");
      setModalIsOpen(true);
    }

    function openModalEdicao(produtoParaEditar: any) {
      setProduto(produtoParaEditar);
      setTipo("edicao");
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
            {produtos.map((produto, index) => (
             <CardProdServ key={index} nome={produto.nome} preco={produto.preco} abrirModalEdicao={() => openModalEdicao(produto)}/>
            ))}
          </div>

          <ModalCadEdiProdServ tipo={tipo} isOpen={modalIsOpen} fecharModal={closeModal} item={produto} categoria="produto" />
    
        </section>

        </>
      );
}

export default DashboardProduto;
