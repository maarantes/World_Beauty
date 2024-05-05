import CPF from "./cpf"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    public genero: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private quantidadeProdutosConsumidos: Array<number>
    private servicosConsumidos: Array<Servico>
    constructor(nome: string, nomeSocial: string, genero:string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.genero = genero
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.quantidadeProdutosConsumidos = []
        this.servicosConsumidos = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getQuantidadeProdutosConsumidos(): Array<number> {
        return this.quantidadeProdutosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public get getGenero(): string {
        return this.genero;
    }

    public adicionarProduto(produto: Produto): void {
        this.produtosConsumidos.push(produto);
    }

    public adicionarQuantidadeProduto(quantidade: number): void {
        this.quantidadeProdutosConsumidos.push(quantidade);
    }
}