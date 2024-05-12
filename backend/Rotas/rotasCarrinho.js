module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();

    // Buscar os produtos E os serviços de um cliente
    router.get("/mostrar/:ClienteID", (req, res) => {
        const { ClienteID } = req.params;
    
        const queryProdutos = `
            SELECT CarrinhoProdutos.ClienteID, CarrinhoProdutos.ProdutoID AS ItemID, CarrinhoProdutos.Quantidade, Produtos.Nome, 'produto' AS Tipo
            FROM CarrinhoProdutos 
            JOIN Produtos ON CarrinhoProdutos.ProdutoID = Produtos.ID 
            WHERE CarrinhoProdutos.ClienteID = ?`;
    
        const queryServicos = `
            SELECT CarrinhoServicos.ClienteID, CarrinhoServicos.ServicoID AS ItemID, CarrinhoServicos.Quantidade, Servicos.Nome, 'servico' AS Tipo
            FROM CarrinhoServicos 
            JOIN Servicos ON CarrinhoServicos.ServicoID = Servicos.ID 
            WHERE CarrinhoServicos.ClienteID = ?`;
    
        connection.query(queryProdutos, [ClienteID], (err, produtos) => {
            if (err) {
                console.error("Erro ao buscar produtos do cliente:", err);
                res.status(500).send("Erro ao buscar produtos do cliente");
            } else {
                connection.query(queryServicos, [ClienteID], (err, servicos) => {
                    if (err) {
                        console.error("Erro ao buscar serviços do cliente:", err);
                        res.status(500).send("Erro ao buscar serviços do cliente");
                    } else {
                        res.status(200).json([...produtos, ...servicos]);
                    }
                });
            }
        });
    });
    

    router.post("/adicionarProduto", (req, res) => {
        const { clienteId, itemID, quantidade } = req.body;

        const query = `INSERT INTO CarrinhoProdutos (ClienteID, ProdutoID, Quantidade) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE Quantidade = Quantidade + ?`;

        connection.query(query, [clienteId, itemID, quantidade, quantidade], (err, result) => {
            if (err) {
                console.error("Erro ao adicionar produto ao carrinho:", err);
                res.status(500).send("Erro ao adicionar produto ao carrinho");
            } else {
                res.status(200).send("Produto adicionado ao carrinho com sucesso!");
            }
        });
    });

    router.delete("/deletarProduto/:ClienteID/:ProdutoID", (req, res) => {
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
    

    // Parte de Serviços

    router.post("/adicionarServico", (req, res) => {
        const { clienteId, itemID, quantidade } = req.body;

        const query = `INSERT INTO CarrinhoServicos (ClienteID, ServicoID, Quantidade) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE Quantidade = Quantidade + ?`;

        connection.query(query, [clienteId, itemID, quantidade, quantidade], (err, result) => {
            if (err) {
                console.error("Erro ao adicionar serviço ao carrinho:", err);
                res.status(500).send("Erro ao adicionar serviço ao carrinho");
            } else {
                res.status(200).send("Serviço adicionado ao carrinho com sucesso!");
            }
        });
    });

    router.delete("/deletarServico/:ClienteID/:ServicoID", (req, res) => {
        const ClienteID = req.params.ClienteID;
        const ServicoID = req.params.ServicoID;
    
        const query = `DELETE FROM CarrinhoServicos WHERE ClienteID = ? AND ServicoID = ?`;
    
        connection.query(query, [ClienteID, ServicoID], (err, result) => {
            if (err) {
                console.error("Erro ao deletar serviço do carrinho", err);
                res.status(500).send("Erro ao deletar serviço do carrinho");
            } else {
                res.status(200).send("Serviço deletado do carrinho com sucesso");
            }
        });
    });





    return router;

};

