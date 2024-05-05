import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Entrada from "../io/entrada";

export default class ListagemProdutosFamosos {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public listarProdutosFamosos(): void {
        let entrada = new Entrada()
        const genero = entrada.receberTexto("\nDigite o gênero (M, F, outro, tudo): ");

        let contadorProdutos: { [nome: string]: number } = {};

        for (let cliente of this.clientes) {
            if (genero === "tudo" || cliente.getGenero.toLowerCase() === genero.toLowerCase()) {
                for (let i = 0; i < cliente.getProdutosConsumidos.length; i++) {
                    let produto = cliente.getProdutosConsumidos[i];
                    let quantidade = cliente.getQuantidadeProdutosConsumidos[i];

                    if (contadorProdutos[produto.nome]) {
                        contadorProdutos[produto.nome] += quantidade;
                    } else {
                        contadorProdutos[produto.nome] = quantidade;
                    }
                }
            }
        }

        console.log("Produtos mais consumidos por clientes do gênero " + genero.toUpperCase() + ":");

        for (let nomeProduto in contadorProdutos) {
            console.log(nomeProduto + ": " + contadorProdutos[nomeProduto]);
        }

        console.log("\n");
    }
}