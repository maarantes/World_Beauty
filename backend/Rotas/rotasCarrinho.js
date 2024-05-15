module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();
    const PegarTokenUsuario = require("../autenticacao");

    // Buscar os produtos E os serviços de um cliente
    router.get("/mostrar/:ClienteID", PegarTokenUsuario, (req, res) => {
        const { ClienteID } = req.params;
        const UsuarioID = req.user.id;
    
        const queryProdutos = `
            SELECT CarrinhoProdutos.ClienteID, CarrinhoProdutos.ProdutoID AS ItemID, CarrinhoProdutos.Quantidade, Produtos.Nome, 'produto' AS Tipo
            FROM CarrinhoProdutos 
            JOIN Produtos ON CarrinhoProdutos.ProdutoID = Produtos.ID 
            WHERE CarrinhoProdutos.ClienteID = ? AND Produtos.UsuarioID = ?`;
    
        const queryServicos = `
            SELECT CarrinhoServicos.ClienteID, CarrinhoServicos.ServicoID AS ItemID, CarrinhoServicos.Quantidade, Servicos.Nome, 'servico' AS Tipo
            FROM CarrinhoServicos 
            JOIN Servicos ON CarrinhoServicos.ServicoID = Servicos.ID 
            WHERE CarrinhoServicos.ClienteID = ? AND Servicos.UsuarioID = ?`;
    
        connection.query(queryProdutos, [ClienteID, UsuarioID], (err, produtos) => {
            if (err) {
                console.error("Erro ao buscar produtos do cliente:", err);
                res.status(500).send("Erro ao buscar produtos do cliente");
            } else {
                connection.query(queryServicos, [ClienteID, UsuarioID], (err, servicos) => {
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
    

    router.post("/adicionarProduto", PegarTokenUsuario, (req, res) => {
        const { clienteId, itemID, quantidade } = req.body;
        const UsuarioID = req.user.id;

        const query = `INSERT INTO CarrinhoProdutos (ClienteID, ProdutoID, Quantidade) 
        SELECT ?, ?, ? FROM Produtos WHERE ID = ? AND UsuarioID = ? 
        ON DUPLICATE KEY UPDATE Quantidade = Quantidade + ?`;

        

        connection.query(query, [clienteId, itemID, quantidade, itemID, UsuarioID, quantidade], (err, result) => {
            if (err) {
                console.error("Erro ao adicionar produto ao carrinho:", err);
                res.status(500).send("Erro ao adicionar produto ao carrinho");
            } else {
                res.status(200).send("Produto adicionado ao carrinho com sucesso!");
            }
        });
    });


    router.delete("/deletarProduto/:ClienteID/:ProdutoID", PegarTokenUsuario, (req, res) => {
        const ClienteID = req.params.ClienteID;
        const ProdutoID = req.params.ProdutoID;
        const UsuarioID = req.user.id;
    
        const query = `DELETE FROM CarrinhoProdutos WHERE ClienteID = ? AND ProdutoID IN 
        (SELECT ID FROM Produtos WHERE ID = ? AND UsuarioID = ?)`;
    
        connection.query(query, [ClienteID, ProdutoID, UsuarioID], (err, result) => {
            if (err) {
                console.error("Erro ao deletar produto do carrinho", err);
                res.status(500).send("Erro ao deletar produto do carrinho");
            } else {
                res.status(200).send("Produto deletado do carrinho com sucesso");
            }
        });
    });
    
    

    // Parte de Serviços

    router.post("/adicionarServico", PegarTokenUsuario, (req, res) => {
        const { clienteId, itemID, quantidade } = req.body;
        const UsuarioID = req.user.id;

        const query = `INSERT INTO CarrinhoServicos (ClienteID, ServicoID, Quantidade) 
        SELECT ?, ?, ? FROM Servicos WHERE ID = ? AND UsuarioID = ? 
        ON DUPLICATE KEY UPDATE Quantidade = Quantidade + ?`;

        connection.query(query, [clienteId, itemID, quantidade, itemID, UsuarioID, quantidade], (err, result) => {
            if (err) {
                console.error("Erro ao adicionar serviço ao carrinho:", err);
                res.status(500).send("Erro ao adicionar serviço ao carrinho");
            } else {
                res.status(200).send("Serviço adicionado ao carrinho com sucesso!");
            }
        });
    });


    router.delete("/deletarServico/:ClienteID/:ServicoID", PegarTokenUsuario, (req, res) => {
        const ClienteID = req.params.ClienteID;
        const ServicoID = req.params.ServicoID;
        const UsuarioID = req.user.id;
    
        const query = `DELETE FROM CarrinhoServicos WHERE ClienteID = ? AND ServicoID IN 
        (SELECT ID FROM Servicos WHERE ID = ? AND UsuarioID = ?)`;
    
        connection.query(query, [ClienteID, ServicoID, UsuarioID], (err, result) => {
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