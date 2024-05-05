import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"

import CadastroCliente from "../negocio/cadastroCliente";
import AtualizarCliente from "../negocio/atualizarCliente";
import ListagemClientes from "../negocio/listagemClientes";
import DeletarCliente from "../negocio/deletarCliente";

import CadastroProduto from "../negocio/cadastroProduto";
import ListagemProdutos from "../negocio/listagemProdutos";
import AtualizarProduto from "../negocio/atualizarProduto";
import DeletarProduto from "../negocio/deletarProduto";
import AdicionarCarrinho from "../negocio/adicionarCarrinho";

import ListarCarrinho from "../negocio/listagemCarrinho";
import DeletarCarrinho from "../negocio/deletarCarrinho";

import ListagemTopDezQuantidade from "../negocio/listagemTopDezQuantidade";
import ListagemTopCincoValor from "../negocio/listagemTopCincoValor";
import ListagemProdutosFamosos from "../negocio/listagemProdutosFamosos";

import insertClientes from "../inserts/insertClientes";
import insertProdutos from "../inserts/insertProdutos";

console.log("[BEM-VINDO AO SISTEMA DO GRUPO WORLD BEAUTY]\n")
let empresa = new Empresa()
let execucao = true

// 30 Clientes pré-cadastrados
let clientes = insertClientes();
clientes.forEach(cliente => empresa.adicionarCliente(cliente));

let produtos = insertProdutos();
produtos.forEach(produto => empresa.adicionarProduto(produto))

while (execucao) {
    console.log("---------- CRUD CLIENTES ----------");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Listar clientes (por gênero ou tudo)");
    console.log("3 - Atualizar informações de um cliente");
    console.log("4 - Deletar um cliente");
    console.log("5 - Adicionar produto ao carrinho de um cliente");
    console.log("6 - Remover produto do carrinho de um cliente");
    console.log("---------- LISTAGENS ----------");
    console.log("7 - Listar carrinho de um cliente");
    console.log("8 - Listar top 10 clientes que mais consumiram em quantidade");
    console.log("9 - Listar top 5 clientes que mais consumiram em valor");
    console.log("10 - Listar produtos mais consumidos (por gênero ou tudo)");
    console.log("---------- CRUD PRODUTOS ----------");
    console.log("11 - Cadastrar Produto");
    console.log("12 - Listar todos os produtos");
    console.log("13 - Atualizar informações de um produto");
    console.log("14 - Deletar um produto");
    console.log("");
    console.log("0 - Sair");

    let entrada = new Entrada()
    let opcao = entrada.receberNumero("Por favor, escolha uma opção: ")

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let atualizarCliente = new AtualizarCliente(empresa.getClientes)
            atualizarCliente.atualizar()
            break;
        case 4:
            let deletarCliente = new DeletarCliente(empresa.getClientes)
            deletarCliente.deletar()
            break;
        case 5:
            let adicionarCarrinho = new AdicionarCarrinho(empresa.getClientes, empresa.getProdutos)
            adicionarCarrinho.adicionar()
            break;
        case 6:
            let deletarCarrinho = new DeletarCarrinho(empresa.getClientes, empresa.getProdutos)
            deletarCarrinho.deletarCarrinho()
            break;
        case 7:
            let listagemCarrinho = new ListarCarrinho(empresa.getClientes)
            listagemCarrinho.listagemCarrinho()
            break;
        case 8:
            let listarTopDezQuantidade = new ListagemTopDezQuantidade(empresa.getClientes)
            listarTopDezQuantidade.listarTopDezQuantidade()
            break;    
        case 9:
            let listarTopCincoValor = new ListagemTopCincoValor(empresa.getClientes)
            listarTopCincoValor.ListagemTopCincoValor()
            break;
        case 10:
            let listarProdutosFamosos = new ListagemProdutosFamosos(empresa.getClientes)
            listarProdutosFamosos.listarProdutosFamosos()
            break;
        case 11:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrar()
            break;
        case 12:
            let listagemProdutos = new ListagemProdutos(empresa.getProdutos)
            listagemProdutos.listar()
            break;
        case 13:
            let atualizarProduto = new AtualizarProduto(empresa.getProdutos)
            atualizarProduto.atualizar()
            break;
        case 14:
            let deletarProduto = new DeletarProduto(empresa.getProdutos)
            deletarProduto.deletar()
            break;
        case 0:
            execucao = false
            console.log("Até mais!")
            break;

        default:
            console.log("Escolha uma operação válida!")
    }
}