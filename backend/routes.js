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
      const query = "INSERT INTO Clientes (Nome, NomeSocial, Genero, CPF) VALUES (?, ?, ?, ?)";
      const values = [Nome, NomeSocial, Genero, CPF];

      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Erro ao cadastrar cliente", err);
          res.status(500).send("Erro ao cadastrar cliente");
        } else {
          res.status(201).send("Cliente cadastrado com sucesso");
        }
      });
    });
  
    return router;
};
