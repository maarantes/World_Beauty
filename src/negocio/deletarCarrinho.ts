import Cliente from "../modelo/cliente";
import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class DeletarCarrinho {
    private clientes: Cliente[];
    private produtos: Produto[];
    
    constructor(clientes: Cliente[], produtos: Produto[]) {
        this.clientes = clientes;
        this.produtos = produtos;
    }

    public deletarCarrinho(): void {
        let entrada = new Entrada()
        const nomeCliente = entrada.receberTexto("\nDigite o primeiro nome do cliente: ");
        const cliente = this.clientes.find(c => c.nome.split(' ')[0] === nomeCliente);

        if (!cliente) {
            console.log("\nCliente " + nomeCliente + " não encontrado.\n");
            return;
        }

        const nomeProduto = entrada.receberTexto("Digite o nome do produto a ser removido: ");
        let indiceProduto = cliente.getProdutosConsumidos.findIndex(produto => produto.nome === nomeProduto);
        
        if (indiceProduto !== -1) {
            cliente.getProdutosConsumidos.splice(indiceProduto, 1);
            cliente.getQuantidadeProdutosConsumidos.splice(indiceProduto, 1);
            console.log("\nProduto removido com sucesso!\n");
        } else {
            console.log("\nProduto não encontrado no carrinho.\n");
        }
    }
}