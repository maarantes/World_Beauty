import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import insertProdutos from "./insertProdutos";

export default function insertClientes() {
    let clientes: Cliente[] = [];
    let produto = insertProdutos();

    // Homens

    let cliente1 = new Cliente("João", "João", "M", new CPF("12345", new Date(2000, 1, 1)));
    cliente1.adicionarProduto(produto[0]);
    cliente1.adicionarQuantidadeProduto(2);
    cliente1.adicionarProduto(produto[3]);
    cliente1.adicionarQuantidadeProduto(4);

    let cliente2 = new Cliente("Carlos", "Carlos", "M", new CPF("12345", new Date(2000, 1, 1)));
    cliente2.adicionarProduto(produto[4]);
    cliente2.adicionarQuantidadeProduto(3);
    let cliente3 = new Cliente("Pedro", "Pedro", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente4 = new Cliente("Lucas", "Lucas", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente5 = new Cliente("Mateus", "Mateus", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente6 = new Cliente("Gabriel", "Gabriel", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente7 = new Cliente("Rafael", "Rafael", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente8 = new Cliente("Daniel", "Daniel", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente9 = new Cliente("Bruno", "Bruno", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente10 = new Cliente("Guilherme", "Guilherme", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente11 = new Cliente("Gustavo", "Gustavo", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente12 = new Cliente("Felipe", "Felipe", "M", new CPF("12345", new Date(2000, 1, 1)));
    cliente12.adicionarProduto(produto[2]);
    cliente12.adicionarQuantidadeProduto(1);
    let cliente13 = new Cliente("Ricardo", "Ricardo", "M", new CPF("12345", new Date(2000, 1, 1)));
    let cliente14 = new Cliente("Rodrigo", "Rodrigo", "M", new CPF("12345", new Date(2000, 1, 1)));

    // Mulheres
    
    let cliente15 = new Cliente("Maria", "Maria", "F", new CPF("12345", new Date(2000, 1, 1)));
    cliente15.adicionarProduto(produto[9]);
    cliente15.adicionarQuantidadeProduto(5);
    let cliente16 = new Cliente("Ana", "Ana", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente17 = new Cliente("Julia", "Julia", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente18 = new Cliente("Luiza", "Luiza", "F", new CPF("12345", new Date(2000, 1, 1)));
    cliente18.adicionarProduto(produto[17]);
    cliente18.adicionarQuantidadeProduto(1);
    let cliente19 = new Cliente("Beatriz", "Beatriz", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente20 = new Cliente("Carolina", "Carolina", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente21 = new Cliente("Fernanda", "Fernanda", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente22 = new Cliente("Gabriela", "Gabriela", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente23 = new Cliente("Daniela", "Daniela", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente24 = new Cliente("Bruna", "Bruna", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente25 = new Cliente("Camila", "Camila", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente26 = new Cliente("Isabela", "Isabela", "F", new CPF("12345", new Date(2000, 1, 1)));
    let cliente27 = new Cliente("Larissa", "Larissa", "F", new CPF("12345", new Date(2000, 1, 1)));
    cliente27.adicionarProduto(produto[10]);
    cliente27.adicionarQuantidadeProduto(4);
    let cliente28 = new Cliente("Patricia", "Patricia", "F", new CPF("12345", new Date(2000, 1, 1)));

    // Outros
    
    let cliente29 = new Cliente("Alex", "Alex", "outro", new CPF("12345", new Date(2000, 1, 1)));
    cliente29.adicionarProduto(produto[19]);
    cliente29.adicionarQuantidadeProduto(1);
    let cliente30 = new Cliente("Jordan", "Jordan", "outro", new CPF("12345", new Date(2000, 1, 1)));

    clientes.push(cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9, cliente10, 
    cliente11, cliente12, cliente13, cliente14, cliente15, cliente16, cliente17, cliente18, cliente19, cliente20, 
    cliente21, cliente22, cliente23, cliente24, cliente25, cliente26, cliente27, cliente28, cliente29, cliente30);

    return clientes;
}
