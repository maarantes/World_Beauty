import Produto from "../modelo/produto";
import Deletar from "./deletar";
import Entrada from "../io/entrada";

export default class DeletarProduto extends Deletar {

    private produtos: Produto[];

    constructor(produtos: Produto[]) {
        super();
        this.produtos = produtos;
    }

    public deletar(): void {

        let entrada = new Entrada()
        let nome_produto = entrada.receberTexto("Escreva o nome do produto que você deseja deletar: ")

        const index = this.produtos.findIndex(produto => produto.nome === nome_produto);
        if (index !== -1) {
            this.produtos.splice(index, 1);
            console.log("\nProduto " + nome_produto + " deletado com sucesso.\n");
        } else {
            console.log("\nEste produto não foi encontrado!\n");
        }
    }
}
