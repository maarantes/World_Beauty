import Produto from "../modelo/produto";
import Atualizar from "./atualizar";
import Entrada from "../io/entrada";

export default class AtualizarProduto {
    private produtos: Produto[];

    constructor(clientes: Produto[]) {
        this.produtos = clientes;
    }

    public atualizar(): void {
        let entrada = new Entrada()
        let nome_produto = entrada.receberTexto("Escreva o nome do produto que você deseja atualizar: ")

        const produto = this.produtos.find(produto => produto.nome === nome_produto);
        if (produto) {
            console.log("1 - Nome");
            console.log("2 - Preço");
            let opcao = entrada.receberNumero("Digite o número da informação que você deseja atualizar: ")

            switch (opcao) {
                case 1:
                    let novo_nome = entrada.receberTexto("Digite o novo nome do produto: ")
                    produto.nome = novo_nome;
                    break;
                case 2:
                    let novo_preco = entrada.receberNumero("Digite o novo preço do Produto: ")
                    produto.preco = novo_preco;

                    break;
                default:
                    console.log("Opção inválida!\n");
            }

            console.log("\nProduto atualizado com sucesso.\n");
        } else {
            console.log("\nProduto não encontrado!\n");
        }
    }
}