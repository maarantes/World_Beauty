import Cliente from "../modelo/cliente";
import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class AdicionarCarrinho {
    private clientes: Cliente[];
    private produtos: Produto[];
    
    constructor(clientes: Cliente[], produtos: Produto[]) {
        this.clientes = clientes;
        this.produtos = produtos;
    }

    public adicionar(): void {
        let entrada = new Entrada()
        const nomeCliente = entrada.receberTexto("Digite o primeiro nome do cliente: ");
        const cliente = this.clientes.find(c => c.nome.split(' ')[0] === nomeCliente);

        if (!cliente) {
            console.log("\nCliente " + nomeCliente + " não encontrado.\n");
            return;
        }

        const nomeProduto = entrada.receberTexto("Digite o nome do produto: ");
        let produto = this.produtos.find(produto => produto.nome === nomeProduto);
        
        if (produto) {
            cliente.adicionarProduto(produto);
            const quantidade = entrada.receberNumero("Digite a quantidade desse produto no carrinho: ");
            cliente.adicionarQuantidadeProduto(quantidade);
        } else {
            console.log("\nProduto não encontrado.\n");
        }

        console.log("\nProduto(s) adicionado(s) com sucesso!\n")
    }
}