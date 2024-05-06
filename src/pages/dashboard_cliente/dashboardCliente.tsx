import "./dashboardCliente.scss"
import Navbar from "../../components/navbar/navbar";
import CardCliente from "../../components/cardCliente/cardCliente";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import ModalCadastrarEditarCliente from "../../components/botaoModalCliente/modalCadastrarEditarCliente";
import { useState } from "react";

function DashboardCliente() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipo, setTipo] = useState<"cadastro" | "edicao">("cadastro");
    // Caso abrir o modal no modo edição ele vai pegar as informações do usuário
    const [usuario, setUsuario] = useState<{nome: string, nome_social: string, genero: string, cpf: number} | undefined>(undefined);

    function openModalCadastro() {
      setTipo("cadastro");
      setModalIsOpen(true);
    }

    function openModalEdicao() {
      setTipo("edicao"); // Definir o tipo para "edicao" quando o botão de editar usuário do Card Cliente for clicado
      setModalIsOpen(true);
    }

    function closeModal() {
      setModalIsOpen(false);
      setUsuario(undefined); // Limpar o estado do usuário
    }
  
    return (
    <>
    <Navbar />
    <section className="margem">

      <h1 className="dashcli_titulo">Lista de Clientes</h1>
      <BotaoCTA escrito="Cadastrar Cliente" aparencia="primario" cor="verde" onClick={openModalCadastro}/>

      <div className="dashcli_generos">
        <BotaoCTA escrito="Tudo" aparencia="primario"/>
        <BotaoCTA escrito="Masculino" aparencia="secundario"/>
        <BotaoCTA escrito="Feminino" aparencia="secundario"/>
        <BotaoCTA escrito="Outros" aparencia="secundario"/>
      </div>

      <p className="dashcli_resultado">
        02 RESULTADOS ENCONTRADOS
      </p>

      <div>
        <CardCliente
        nome="Daniel Oliveira"
        nome_social="Daniel"
        genero="Masculino"
        cpf={44396793820}
        produtos={[{ nome: "Esmalte Rosa", quantidade: 5 }]}
        servicos={[{ nome: "Manicure", quantidade: 5 }]}
        abrirModalEdicao={() => {
          setUsuario({
            nome: "Daniel Oliveira",
            nome_social: "Daniel",
            genero: "Masculino",
            cpf: 44396793820
          });
          openModalEdicao();
        }}
        />

        <CardCliente
        nome="Rosângela Pires"
        nome_social="Rosa"
        genero="Feminino"
        cpf={12212100000}
        produtos={[{ nome: "Tinta para Cabelo", quantidade: 2 }]}
        servicos={[{ nome: "Hidratação de Cabelo", quantidade: 8 }]}
        abrirModalEdicao={() => {
          setUsuario({
            nome: "Rosângela",
            nome_social: "Rosa",
            genero: "Feminino",
            cpf: 12212100000
          });
          openModalEdicao();
        }}
        />
      </div>

      <ModalCadastrarEditarCliente tipo={tipo} isOpen={modalIsOpen} fecharModal={closeModal} usuario={usuario} />

    </section>
    </>
  );
}

export default DashboardCliente;