import Cliente from "../modelo/cliente";
import Atualizar from "./atualizar";
import Entrada from "../io/entrada";

export default class AtualizarCliente {
    private clientes: Cliente[];

    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    public atualizar(): void {
        let entrada = new Entrada()
        let nome_cliente = entrada.receberTexto("\nEscreva o primeiro nome do cliente que você deseja atualizar: ")

        const cliente = this.clientes.find(cliente => cliente.nome === nome_cliente);
        if (cliente) {
            console.log("1 - Nome");
            console.log("2 - Nome Social");
            console.log("3 - Gênero");
            let opcao = entrada.receberNumero("Digite o número da informação que você deseja atualizar: ")

            switch (opcao) {
                case 1:
                    let novo_nome = entrada.receberTexto("Digite o novo nome do cliente: ")
                    cliente.nome = novo_nome;
                    break;
                case 2:
                    let novo_nome_social = entrada.receberTexto("Digite o novo nome social do cliente: ")
                    cliente.nomeSocial = novo_nome_social;
                    break;
                case 3:
                    let novo_genero = entrada.receberTexto("Digite o novo gênero do cliente:")
                    cliente.genero = novo_genero
                default:
                    console.log("Opção inválida!\n");
            }

            console.log("\nCliente atualizado com sucesso.\n");
        } else {
            console.log("\nCliente não encontrado!\n");
        }
    }
}