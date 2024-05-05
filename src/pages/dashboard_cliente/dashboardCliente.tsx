import "./dashboardCliente.scss"
import Navbar from "../../components/navbar/navbar";
import CardCliente from "../../components/cardCliente/cardCliente";
import BotaoCTA from "../../components/botaoCTA/botaoCTA";

function dashboardCliente() {
  
  return (
    <>
    <Navbar />
    <section className="margem">

      <h1 className="dashcli_titulo">Lista de Clientes</h1>
      <BotaoCTA escrito="Cadastrar Cliente" aparencia="primario" cor="verde" />

      <div className="dashcli_generos">
        <BotaoCTA escrito="Tudo" aparencia="primario"/>
        <BotaoCTA escrito="Masculino" aparencia="secundario"/>
        <BotaoCTA escrito="Feminino" aparencia="secundario"/>
        <BotaoCTA escrito="Outros" aparencia="secundario"/>
      </div>

      <p className="dashcli_resultado">
        01 RESULTADOS ENCONTRADOS
      </p>

      <div>
        <CardCliente
        nome="Daniel Oliveira"
        nome_social="Daniel"
        genero="Masculino"
        cpf={44396793820}
        produtos={[{ nome: "Esmalte Rosa", quantidade: 5 }]}
        servicos={[{ nome: "Manicure", quantidade: 5 }]}
        />
      </div>

    </section>
    </>
  );
}

export default dashboardCliente;