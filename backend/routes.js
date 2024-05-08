module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();
  
    router.get("/mostrarClientes", (req, res) => {
      connection.query("SELECT * FROM Clientes", (err, results) => {
        if (err) {
          console.error("Erro ao buscar registros", err);
          res.status(500).send("Erro ao buscar registros");
        } else {
          res.json(results);
        }
      });
    });

    router.post("/cadastrarCliente", (req, res) => {
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
  
    return router;
};
