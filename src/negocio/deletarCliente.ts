import Cliente from "../modelo/cliente";
import Deletar from "./deletar";
import Entrada from "../io/entrada";

export default class DeletarCliente extends Deletar {

    private clientes: Cliente[];

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
    }

    public deletar(): void {

        let entrada = new Entrada()
        let nome_cliente = entrada.receberTexto("Escreva o primeiro nome do cliente que você deseja deletar: ")

        const index = this.clientes.findIndex(cliente => cliente.nome === nome_cliente);
        if (index !== -1) {
            this.clientes.splice(index, 1);
            console.log("\nCliente " + nome_cliente + " deletado com sucesso.\n");
        } else {
            console.log("\nEste cliente não foi encontrado!\n");
        }
    }
}
