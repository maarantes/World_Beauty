import { useState } from "react";
import "./dashboard.scss"
import Navbar from "../../components/navbar/navbar";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import CardProduto from "../../components/cardProduto/cardProduto";
import ModalCadEdiProdServ from "../../components/modalCadEdiProdServ/modalCadEdiProdServ";

function DashboardProduto() {

    const produtos = [
        {
            nome: "Corte de Cabelo",
            preco: 70
        },
        {
            nome: "Manicure",
            preco: 80
        }
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState<"cadastro" | "edicao">("cadastro");
    // Caso abrir o modal no modo edição ele vai pegar as informações do usuário
    const [produto, setProduto] = useState<{nome: string, preco: number} | undefined>(undefined);

    function openModalCadastro() {
      setTipo("cadastro");
      setModalIsOpen(true);
    }

    function openModalEdicao() {
      setTipo("edicao"); // Definir o tipo para "edicao" quando o botão de editar usuário do Card Produto for clicado
      setModalIsOpen(true);
    }

    function closeModal() {
      setModalIsOpen(false);
      setProduto(undefined); // Limpar o estado do Produto
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
              <CardProduto key={index} nome={produto.nome} preco={produto.preco} abrirModalEdicao={openModalEdicao}/>
            ))}
          </div>

          <ModalCadEdiProdServ tipo={tipo} isOpen={modalIsOpen} fecharModal={closeModal} produto={produto} />
    
        </section>

        </>
      );
}

export default DashboardProduto;
