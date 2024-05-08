import React, { useState, useContext } from 'react';
import { ClienteContext } from '../../contexts/clienteProvider';
import "./dashboard.scss"
import Navbar from "../../components/navbar/navbar";
import CardCliente from "../../components/cardCliente/cardCliente";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";
import ModalCadastrarEditarCliente from "../../components/modalCadastrarEditarCliente/modalCadastrarEditarCliente";

function DashboardCliente() {

  const { Clientes } = useContext(ClienteContext);

    // Filtrar cartões por gênero
    const [generoFiltro, setGeneroFiltro] = useState('Tudo');

    const filtrarClientes = () => {
      if (generoFiltro === 'Tudo') {
        return Clientes;
      } else {
        return Clientes.filter(cliente => cliente.Genero === generoFiltro);
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
        <BotaoCTA escrito="Tudo" aparencia={generoFiltro === 'Tudo' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Tudo')} className={generoFiltro === 'Tudo' ? 'sem_hover' : ''} />
        <BotaoCTA escrito="Masculino" aparencia={generoFiltro === 'Masculino' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Masculino')} className={generoFiltro === 'Masculino' ? 'sem_hover' : ''} />
        <BotaoCTA escrito="Feminino" aparencia={generoFiltro === 'Feminino' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Feminino')} className={generoFiltro === 'Feminino' ? 'sem_hover' : ''} />
        <BotaoCTA escrito="Outros" aparencia={generoFiltro === 'Outro' ? 'primario' : 'secundario'} onClick={() => setGeneroFiltro('Outro')} className={generoFiltro === 'Outro' ? 'sem_hover' : ''} />
    </div>

      <p className="dash_resultado">
        {filtrarClientes().length} RESULTADOS ENCONTRADOS
      </p>

      <div>
      {filtrarClientes() && filtrarClientes().map(cliente => (
          <CardCliente
            ID={cliente.ID}
            key={cliente.ID}
            Nome={cliente.Nome}
            NomeSocial={cliente.NomeSocial}
            Genero={cliente.Genero}
            CPF={cliente.CPF}
            Produtos={cliente.Produtos ? cliente.Produtos.map(p => ({ Nome: p.produto.nome, quantidade: p.quantidade })) : []}
            Servicos={cliente.Servicos ? cliente.Servicos.map(s => ({ Nome: s.servico.nome, quantidade: s.quantidade })) : []}
            abrirModalEdicao={() => {
              setUsuario({
                nome: cliente.Nome,
                nome_social: cliente.NomeSocial,
                genero: cliente.Genero,
                cpf: cliente.CPF
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