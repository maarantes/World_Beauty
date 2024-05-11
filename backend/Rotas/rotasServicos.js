module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();

    // Rota de listagem
    router.get("/mostrar", (req, res) => {
      connection.query("SELECT * FROM Servicos", (err, results) => {
        if (err) {
          console.error("Erro ao buscar registros", err);
          res.status(500).send("Erro ao buscar registros");
        } else {
          res.json(results);
        }
      });
    });

    //Rota de cadastro
    router.post('/cadastrar', (req, res) => {
        let servico = req.body;
        var sql = 'INSERT INTO Servicos (Nome, Preco) VALUES (?, ?)';
        connection.query(sql, [servico.Nome, servico.Preco], (err, result) => {
            if (err) {
                console.error('Erro ao inserir serviço:', err);
                res.status(500).send(`Erro ao adicionar serviço: ${err.message}`);
            } else {
                res.status(201).send(`serviço adicionado com ID: ${result.insertId}`);
            }
        });
    });

    // Rota de edição
    router.put("/editar/:id", (req, res) => {
    const { Nome, Preco } = req.body;
    const idParam = req.params.id;

    // Verificar se já existe um serviço com o mesmo ID
    const queryVerificacao = "SELECT * FROM Servicos WHERE ID = ?";
        connection.query(queryVerificacao, [idParam], (err, results) => {
        if (err) {
            console.error("Erro ao verificar serviço", err);
            res.status(500).send("Erro ao verificar serviço");
         } else if (results.length === 0) {
           // Se não encontrar um serviço com o mesmo ID enviar uma resposta de erro
           res.status(400).send("Não existe um serviço com este ID");
        } else {
              // Se encontrar, prosseguir com a edição
              const queryEdicao = "UPDATE Servicos SET Nome = ?, Preco = ? WHERE ID = ?";
              const values = [Nome, Preco, idParam];

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
    router.delete("/deletar/:id", (req, res) => {
        let comando = `DELETE FROM Servicos WHERE ID = ${req.params.id}`;
        let query = connection.query(comando, (err, result) => {
        if (err) {
            console.error("Erro ao deletar serviço", err);
            res.status(500).send("Erro ao deletar serviço");
        } else {
        res.send("Serviço deletado com sucesso!");
        }
    });
    });
    
    return router;

};