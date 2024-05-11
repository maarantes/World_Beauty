module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();

    // Rota de listagem
    router.get("/mostrar", (req, res) => {
        connection.query("SELECT * FROM Produtos", (err, results) => {
          if (err) {
            console.error("Erro ao buscar registros", err);
            res.status(500).send("Erro ao buscar registros");
          } else {
            res.json(results);
          }
        });
    });

    // Rota de cadastro
    router.post('/cadastrar', (req, res) => {
        let produto = req.body;
        var sql = 'INSERT INTO Produtos (Nome, Preco) VALUES (?, ?)';
        connection.query(sql, [produto.Nome, produto.Preco], (err, result) => {
            if (err) {
                console.error('Erro ao inserir produto:', err);
                res.status(500).send(`Erro ao adicionar produto: ${err.message}`);
            } else {
                res.status(201).send(`Produto adicionado com ID: ${result.insertId}`);
            }
        });
    });

    // Rota de deletar
    router.put("/editar/:id", (req, res) => {
        const { Nome, Preco } = req.body;
        const idParam = req.params.id;

        // Verificar se já existe um produto com o mesmo ID
        const queryVerificacao = "SELECT * FROM Produtos WHERE ID = ?";
        connection.query(queryVerificacao, [idParam], (err, results) => {
            if (err) {
                console.error("Erro ao verificar produto", err);
                res.status(500).send("Erro ao verificar produto");
            } else if (results.length === 0) {
                // Se não encontrar um produto com o mesmo ID enviar uma resposta de erro
                res.status(400).send("Não existe um produto com este ID");
            } else {
                // Se encontrar, prosseguir com a edição
                const queryEdicao = "UPDATE Produtos SET Nome = ?, Preco = ? WHERE ID = ?";
                const values = [Nome, Preco, idParam];

                connection.query(queryEdicao, values, (err, results) => {
                    if (err) {
                        console.error("Erro ao editar produto", err);
                        res.status(500).send("Erro ao editar produto");
                    } else {
                        res.status(200).send("Produto editado com sucesso");
                    }
                });
            }
        });
    });

    // Rota de deletar
    router.delete("/deletar/:id", (req, res) => {
        // Primeiro deleta o produto de todos os carrinhos que tem esse produto, para não quebrar o banco
        let comando = `DELETE FROM CarrinhoProdutos WHERE ProdutoID = ${req.params.id}`;
        let query = connection.query(comando, (err, result) => {
            if (err) {
                console.error("Erro ao deletar produto do carrinho", err);
                res.status(500).send("Erro ao deletar produto do carrinho");
            } else {
                comando = `DELETE FROM Produtos WHERE ID = ${req.params.id}`;
                query = connection.query(comando, (err, result) => {
                    if (err) {
                        console.error("Erro ao deletar produto", err);
                        res.status(500).send("Erro ao deletar produto");
                    } else {
                        res.send("Produto deletado com sucesso!");
                    }
                });
            }
        });
    });
   
    return router;

};