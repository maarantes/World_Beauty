import "./dashboard.scss"
import Navbar from "../../components/navbar/navbar";
import CardCliente from "../../components/cardCliente/cardCliente";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import ModalCadastrarEditarCliente from "../../components/modalCadastrarEditarCliente/modalCadastrarEditarCliente";
import { useState } from "react";

function DashboardCliente() {

    // Filtrar cartões por gênero
    const [generoFiltro, setGeneroFiltro] = useState('Tudo');

    const clientes = [
      {
        nome: "Daniel Oliveira",
        nome_social: "Daniel",
        genero: "Masculino",
        cpf: 44396793820,
        produtos: [{ nome: "Esmalte Rosa", quantidade: 5 }],
        servicos: [{ nome: "Manicure", quantidade: 5 }]
      },
      {
        nome: "Rosângela Pires",
        nome_social: "Rosa",
        genero: "Feminino",
        cpf: 12212100000,
        produtos: [{ nome: "Tinta para Cabelo", quantidade: 2 }],
        servicos: [{ nome: "Hidratação de Cabelo", quantidade: 8 }]
      }
    ];

    const filtrarClientes = () => {
      if (generoFiltro === 'Tudo') {
        return clientes;
      } else {
        return clientes.filter(cliente => cliente.genero === generoFiltro);
      }
    };

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

    <h1 className="dash_titulo">Lista de Clientes</h1>
    <BotaoCTA escrito="Cadastrar Cliente" aparencia="primario" cor="verde" onClick={openModalCadastro}/>

    <div className="dash_generos">
        <BotaoCTA escrito="Tudo" aparencia={generoFiltro === 'Tudo' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Tudo')} />
        <BotaoCTA escrito="Masculino" aparencia={generoFiltro === 'Masculino' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Masculino')} />
        <BotaoCTA escrito="Feminino" aparencia={generoFiltro === 'Feminino' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Feminino')} />
        <BotaoCTA escrito="Outros" aparencia={generoFiltro === 'Outros' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Outros')} />
    </div>

      <p className="dash_resultado">
        {filtrarClientes().length} RESULTADOS ENCONTRADOS
      </p>

      <div>
        {filtrarClientes().map(cliente => (
          <CardCliente
            nome={cliente.nome}
            nome_social={cliente.nome_social}
            genero={cliente.genero}
            cpf={cliente.cpf}
            produtos={cliente.produtos}
            servicos={cliente.servicos}
            abrirModalEdicao={() => {
              setUsuario({
                nome: cliente.nome,
                nome_social: cliente.nome_social,
                genero: cliente.genero,
                cpf: cliente.cpf
              });
              openModalEdicao();
            }}
          />
        ))}
      </div>

      <ModalCadastrarEditarCliente tipo={tipo} isOpen={modalIsOpen} fecharModal={closeModal} usuario={usuario} />

    </section>
    </>
  );
}

export default DashboardCliente;