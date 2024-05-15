module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();
    const PegarTokenUsuario = require("../autenticacao");

    // Rota de listagem
    router.get("/mostrar", PegarTokenUsuario, (req, res) => {
        const UsuarioID = req.user.id;  
        connection.query("SELECT * FROM Servicos WHERE UsuarioID = ?", [UsuarioID], (err, results) => {
        if (err) {
          console.error("Erro ao buscar registros", err);
          res.status(500).send("Erro ao buscar registros");
        } else {
          res.json(results);
        }
      });
    });

    //Rota de cadastro
    router.post("/cadastrar", PegarTokenUsuario, (req, res) => {
        const UsuarioID = req.user.id;  
        let servico = req.body;
        var sql = "INSERT INTO Servicos (Nome, Preco, UsuarioID) VALUES (?, ?, ?)";
        
        connection.query(sql, [servico.Nome, servico.Preco, UsuarioID], (err, result) => {
            if (err) {
                console.error("Erro ao inserir serviço:", err);
                res.status(500).send(`Erro ao adicionar serviço: ${err.message}`);
            } else {
                res.status(201).send(`serviço adicionado com ID: ${result.insertId}`);
            }
        });
    });

    // Rota de edição
    router.put("/editar/:id", PegarTokenUsuario, (req, res) => {
    const UsuarioID = req.user.id;      
    const { Nome, Preco } = req.body;
    const idParam = req.params.id;

    // Verificar se já existe um serviço com o mesmo ID
    const queryVerificacao = "SELECT * FROM Servicos WHERE ID = ? AND UsuarioID = ?";
        connection.query(queryVerificacao, [idParam, UsuarioID], (err, results) => {
        if (err) {
            console.error("Erro ao verificar serviço", err);
            res.status(500).send("Erro ao verificar serviço");
         } else if (results.length === 0) {
           // Se não encontrar um serviço com o mesmo ID enviar uma resposta de erro
           res.status(400).send("Não existe um serviço com este ID");
        } else {
              // Se encontrar, prosseguir com a edição
              const queryEdicao = "UPDATE Servicos SET Nome = ?, Preco = ? WHERE ID = ? AND UsuarioID = ?";
              const values = [Nome, Preco, idParam, UsuarioID];

              connection.query(queryEdicao, values, (err, results) => {
                  if (err) {
                      console.error("Erro ao editar serviço", err);
                      res.status(500).send("Erro ao editar serviço");
                  } else {
                      res.status(200).send("Serviço editado com sucesso");
                  }
              });
            }
        });
    });

    // Rota de deletar
    router.delete("/deletar/:id", PegarTokenUsuario, (req, res) => {
    const UsuarioID = req.user.id;  
    // Primeiro deleta o serviço de todos os carrinhos que tem esse serviço, para não quebrar o banco
    let comando = `DELETE FROM CarrinhoServicos WHERE ServicoID IN (SELECT ID FROM Servicos WHERE ID = ? AND UsuarioID = ?)`;
    let query = connection.query(comando, [req.params.id, UsuarioID], (err, result) => {
        if (err) {
            console.error("Erro ao deletar serviço do carrinho", err);
            res.status(500).send("Erro ao deletar serviço do carrinho");
        } else {
            comando = `DELETE FROM Servicos WHERE ID = ? AND UsuarioID = ?`;
            query = connection.query(comando, [req.params.id, UsuarioID], (err, result) => {
                if (err) {
                    console.error("Erro ao deletar serviço", err);
                    res.status(500).send("Erro ao deletar serviço");
                } else {
                    res.send("Serviço deletado com sucesso!");
                }
            });
        }
    });
});

    
    return router;

};