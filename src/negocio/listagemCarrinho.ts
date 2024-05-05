import Cliente from "../modelo/cliente";
import Entrada from "../io/entrada";

export default class ListarCarrinho {
    private clientes: Cliente[];
    
    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    public listagemCarrinho(): void {
        let entrada = new Entrada()
        const nomeCliente = entrada.receberTexto("Digite o primeiro nome do cliente: ");
        const cliente = this.clientes.find(c => c.nome.split(' ')[0] === nomeCliente);
    
        if (!cliente) {
            console.log("Cliente " + nomeCliente + " não encontrado.");
            return;
        }
    
        console.log("Produtos no carrinho de " + nomeCliente + ":");
    
        for (let i = 0; i < cliente.getProdutosConsumidos.length; i++) {
            console.log(cliente.getProdutosConsumidos[i].nome + ": " + cliente.getQuantidadeProdutosConsumidos[i]) + "R$";
        }
        
        console.log("\n")
    }
}