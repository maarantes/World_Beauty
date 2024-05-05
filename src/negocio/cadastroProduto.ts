import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro"

export default class CadastroProduto extends Cadastro {
    private entrada: Entrada
    private produtos: Array<Produto>

    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        console.log("Iniciando o cadastro de um produto")
        let nome = this.entrada.receberTexto("Digite o nome do produto: ")
        let preco = this.entrada.receberNumero("Digite o preço dele: ")
        let produto = new Produto(nome, preco)
        produto.nome = nome
        produto.preco = preco
        this.produtos.push(produto)

        console.log("\nProduto cadastrado com sucesso!\n")
    }
}