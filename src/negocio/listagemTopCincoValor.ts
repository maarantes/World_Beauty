import Cliente from "../modelo/cliente";

export default class ListagemTopCincoValor {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public ListagemTopCincoValor(): void {
        let clientesComTotalGasto = this.clientes.map(cliente => {
            let totalGasto = 0;
            for (let i = 0; i < cliente.getProdutosConsumidos.length; i++) {
                totalGasto += cliente.getProdutosConsumidos[i].preco * cliente.getQuantidadeProdutosConsumidos[i];
            }
            return { cliente: cliente, totalGasto: totalGasto };
        });

        // Classifica os clientes pelo valor total gasto
        clientesComTotalGasto.sort((a, b) => b.totalGasto - a.totalGasto);

        console.log("Top 5 clientes que mais gastaram:");

        // Lista os 5 principais clientes
        for (let i = 0; i < Math.min(5, clientesComTotalGasto.length); i++) {
            console.log((i + 1) + ". " + clientesComTotalGasto[i].cliente.nome + ": " + clientesComTotalGasto[i].totalGasto);
        }

        console.log("\n");
    }
}