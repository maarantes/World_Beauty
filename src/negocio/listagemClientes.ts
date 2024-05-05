// ListagemClientes.ts
import Cliente from "../modelo/cliente";
import Entrada from "../io/entrada";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let entrada = new Entrada()
        const genero = entrada.receberTexto("Digite o gênero (M, F, outro, tudo): ");

        console.log("\nLista de clientes:");
        this.clientes.forEach(cliente => {
            if (genero === "tudo" || cliente.getGenero === genero) { // Corrigido aqui
                console.log("Nome: " + cliente.nome);
                console.log("Nome social: " + cliente.nomeSocial);
                console.log("Gênero: " + cliente.getGenero);
                console.log("CPF: " + cliente.getCpf.getValor);
                console.log("--------------------------------------");
            }
        });
        console.log("\n");
    }
}