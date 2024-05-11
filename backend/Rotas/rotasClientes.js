module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();

    // Rota de listagem
    router.get("/mostrar", (req, res) => {
        connection.query("SELECT * FROM Clientes", (err, results) => {
          if (err) {
            console.error("Erro ao buscar registros", err);
            res.status(500).send("Erro ao buscar registros");
          } else {
            res.json(results);
          }
        });
    });

    // Rota de cadastro
    router.post("/cadastrar", (req, res) => {
        const { Nome, NomeSocial, Genero, CPF } = req.body;
      
        // Verificar se já existe um cliente com o mesmo nome ou CPF
        const queryVerificacao = "SELECT * FROM Clientes WHERE Nome = ? OR CPF = ?";
        connection.query(queryVerificacao, [Nome, CPF], (err, results) => {
          if (err) {
            console.error("Erro ao verificar cliente", err);
            res.status(500).send("Erro ao verificar cliente");
          } else if (results.length > 0) {
            // Se encontrar um cliente com o mesmo nome ou CPF enviar uma resposta de erro
            res.status(400).send("Já existe um cliente com o mesmo nome ou CPF");
          } else {
            // Se não encontrar, prosseguir com o cadastro
            const queryCadastro = "INSERT INTO Clientes (Nome, NomeSocial, Genero, CPF) VALUES (?, ?, ?, ?)";
            const values = [Nome, NomeSocial, Genero, CPF];
      
            connection.query(queryCadastro, values, (err, results) => {
              if (err) {
                console.error("Erro ao cadastrar cliente", err);
                res.status(500).send("Erro ao cadastrar cliente");
              } else {
                res.status(201).send("Cliente cadastrado com sucesso");
              }
            });
          }
        });
    });

    // Rota de edição
    router.put("/editar/:id", (req, res) => {
        const { Nome, NomeSocial, Genero, CPF } = req.body;
        const idParam = req.params.id;
    
        // Verificar se já existe um cliente com o mesmo ID
        const queryVerificacao = "SELECT * FROM Clientes WHERE ID = ?";
        connection.query(queryVerificacao, [idParam], (err, results) => {
            if (err) {
                console.error("Erro ao verificar cliente", err);
                res.status(500).send("Erro ao verificar cliente");
            } else if (results.length === 0) {
                // Se não encontrar um cliente com o mesmo ID enviar uma resposta de erro
                res.status(400).send("Não existe um cliente com este ID");
            } else {
                // Se encontrar, prosseguir com a edição
                const queryEdicao = "UPDATE Clientes SET Nome = ?, NomeSocial = ?, Genero = ?, CPF = ? WHERE ID = ?";
                const values = [Nome, NomeSocial, Genero, CPF, idParam];
    
                connection.query(queryEdicao, values, (err, results) => {
                    if (err) {
                        console.error("Erro ao editar cliente", err);
                        res.status(500).send("Erro ao editar cliente");
                    } else {
                        res.status(200).send("Cliente editado com sucesso");
                    }
                });
            }
        });
    });

    // Rota de deletar
    router.delete("/deletar/:id", (req, res) => {
        let comando = `DELETE FROM Clientes WHERE ID = ${req.params.id}`;
        let query = connection.query(comando, (err, result) => {
          if (err) {
            console.error("Erro ao deletar cliente", err);
            res.status(500).send("Erro ao deletar cliente");
          } else {
            res.send("Cliente deletado com sucesso!");
          }
        });
    });

  return router;

};