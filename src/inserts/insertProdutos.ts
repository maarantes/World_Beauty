import Produto from "../modelo/produto";

export default function insertProdutos() {
    let produtos: Produto[] = [];

    const produto1 = new Produto("Perfume", 50.00);
    const produto2 = new Produto("Shampoo", 15.00);
    const produto3 = new Produto("Body Splash", 25.00);
    const produto4 = new Produto("Desodorante", 7.50);
    const produto5 = new Produto("Condicionador", 20.00);
    const produto6 = new Produto("Maquiagem", 28.00);
    const produto7 = new Produto("Hidratante", 15.00);
    const produto8 = new Produto("Creme Facial", 25.00);
    const produto9 = new Produto("Creme de Barbear", 20.00);
    const produto10 = new Produto("Esmalte", 12.00);
    const produto11 = new Produto("Gel para cabelo", 18.50);
    const produto12 = new Produto("Delineador", 12.00);
    const produto13 = new Produto("Rímel", 20.00);
    const produto14 = new Produto("Batom", 25.00);
    const produto15 = new Produto("Cera", 10.00);
    const produto16 = new Produto("Spray Fixador", 45.00);
    const produto17 = new Produto("Tinta pra cabelo", 22.50);
    const produto18 = new Produto("Chapinha", 70.00);
    const produto19 = new Produto("Lápis de olho", 5.00);
    const produto20 = new Produto("Creme pós-barba", 20.00);

    produtos.push( produto1, produto2, produto3, produto4, produto5, produto6, produto7,
    produto8, produto9, produto10, produto11, produto12, produto13, produto14,
    produto15, produto16, produto17, produto18, produto19, produto20);

    return produtos;
}

