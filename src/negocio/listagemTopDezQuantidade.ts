import Cliente from "../modelo/cliente";

export default class ListagemTopDezQuantidade {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public listarTopDezQuantidade(): void {
        let clientesComQuantidadeTotal = this.clientes.map(cliente => {
            let quantidadeTotal = cliente.getQuantidadeProdutosConsumidos.reduce((a, b) => a + b, 0);
            return { cliente: cliente, quantidadeTotal: quantidadeTotal };
        });

        clientesComQuantidadeTotal.sort((a, b) => b.quantidadeTotal - a.quantidadeTotal);

        console.log("Top 10 clientes com base na quantidade de produtos no carrinho:");

        for (let i = 0; i < Math.min(10, clientesComQuantidadeTotal.length); i++) {
            console.log((i + 1) + ". " + clientesComQuantidadeTotal[i].cliente.nome + ": " + clientesComQuantidadeTotal[i].quantidadeTotal);
        }

        console.log("\n");
    }
}