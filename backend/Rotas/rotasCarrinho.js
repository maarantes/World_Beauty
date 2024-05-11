module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();


    router.post("/adicionarProduto", (req, res) => {
        const { clienteId, itemID, quantidade } = req.body;

        const query = `INSERT INTO CarrinhoProdutos (ClienteID, ProdutoID, Quantidade) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE Quantidade = Quantidade + ?`;

        connection.query(query, [clienteId, itemID, quantidade, quantidade], (err, result) => {
            if (err) {
                console.error("Erro ao adicionar produto ao carrinho:", err);
                res.status(500).send("Erro ao adicionar produto ao carrinho");
            } else {
                console.log("Produto adicionado ao carrinho com sucesso!");
                res.status(200).send("Produto adicionado ao carrinho com sucesso!");
            }
        });
    });

    router.get("/mostrar/:ClienteID", (req, res) => {
        const { ClienteID } = req.params;
    
        const query = `
            SELECT CarrinhoProdutos.ClienteID, CarrinhoProdutos.ProdutoID, CarrinhoProdutos.Quantidade, Produtos.Nome 
            FROM CarrinhoProdutos 
            JOIN Produtos ON CarrinhoProdutos.ProdutoID = Produtos.ID 
            WHERE CarrinhoProdutos.ClienteID = ?`;
    
        connection.query(query, [ClienteID], (err, result) => {
            if (err) {
                console.error("Erro ao buscar produtos do cliente:", err);
                res.status(500).send("Erro ao buscar produtos do cliente");
            } else {
                console.log("Produtos do cliente buscados com sucesso!");
                res.status(200).json(result);
            }
        });
    });

    router.delete("/deletar/:ClienteID/:ProdutoID", (req, res) => {
        const ClienteID = req.params.ClienteID;
        const ProdutoID = req.params.ProdutoID;
    
        const query = `DELETE FROM CarrinhoProdutos WHERE ClienteID = ? AND ProdutoID = ?`;
    
        connection.query(query, [ClienteID, ProdutoID], (err, result) => {
            if (err) {
                console.error("Erro ao deletar produto do carrinho", err);
                res.status(500).send("Erro ao deletar produto do carrinho");
            } else {
                res.status(200).send("Produto deletado do carrinho com sucesso");
            }
        });
    });
    

    return router;

};