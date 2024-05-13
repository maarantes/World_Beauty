module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();

    router.get("/topClientesQTD", (req, res) => {
        const query = `
            SELECT Clientes.Nome, Carrinho.ClienteID, SUM(Carrinho.Quantidade) as Total
            FROM (
                SELECT ClienteID, Quantidade FROM CarrinhoProdutos
                UNION ALL
                SELECT ClienteID, Quantidade FROM CarrinhoServicos
            ) AS Carrinho
            JOIN Clientes ON Carrinho.ClienteID = Clientes.ID
            GROUP BY Carrinho.ClienteID
            ORDER BY Total DESC
            LIMIT 10`;
    
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Erro ao buscar Top 10 Clientes que consumiram em quantidade:", err);
                res.status(500).send("Erro ao buscar Top 10 Clientes que consumiram em quantidade:");
            } else {
                res.status(200).json(result);
            }
        });
    });

    router.get("/topClientesValor", (req, res) => {
        const query = `
            SELECT Clientes.Nome, Carrinho.ClienteID, SUM(Carrinho.ValorTotal) as Total
            FROM (
                SELECT ClienteID, Quantidade * Produtos.Preco AS ValorTotal FROM CarrinhoProdutos JOIN Produtos ON CarrinhoProdutos.ProdutoID = Produtos.ID
                UNION ALL
                SELECT ClienteID, Quantidade * Servicos.Preco AS ValorTotal FROM CarrinhoServicos JOIN Servicos ON CarrinhoServicos.ServicoID = Servicos.ID
            ) AS Carrinho
            JOIN Clientes ON Carrinho.ClienteID = Clientes.ID
            GROUP BY Carrinho.ClienteID
            ORDER BY Total DESC
            LIMIT 5`;
    
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Erro ao buscar Top 5 Clientes que consumiram em valor:", err);
                res.status(500).send("Erro ao buscar Top 5 Clientes que consumiram em valor:");
            } else {
                res.status(200).json(result);
            }
        });
    });

    router.get("/topProdutos/:genero", (req, res) => {
        const genero = req.params.genero;
        let query = "";
        let params = [];
    
        // Sem cláusula WHERE de Gênero
        if (genero === "tudo") {
            query = `
                SELECT Produtos.Nome, SUM(CarrinhoProdutos.Quantidade) as Total
                FROM CarrinhoProdutos
                JOIN Produtos ON CarrinhoProdutos.ProdutoID = Produtos.ID
                JOIN Clientes ON CarrinhoProdutos.ClienteID = Clientes.ID
                GROUP BY Produtos.Nome
                ORDER BY Total DESC
                LIMIT 10`;
        } else {
            query = `
                SELECT Produtos.Nome, SUM(CarrinhoProdutos.Quantidade) as Total
                FROM CarrinhoProdutos
                JOIN Produtos ON CarrinhoProdutos.ProdutoID = Produtos.ID
                JOIN Clientes ON CarrinhoProdutos.ClienteID = Clientes.ID
                WHERE Clientes.Genero = ?
                GROUP BY Produtos.Nome
                ORDER BY Total DESC
                LIMIT 10`;
            params = [genero];
        }
    
        connection.query(query, params, (err, result) => {
            if (err) {
                console.error("Erro ao buscar produtos por gênero:", err);
                res.status(500).send("Erro ao buscar produtos por gênero:");
            } else {
                res.status(200).json(result);
            }
        });
    });
    
    




    return router;

};