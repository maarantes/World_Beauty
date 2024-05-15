module.exports = (connection) => {
  const express = require("express");
  const router = express.Router();
  const PegarTokenUsuario = require("../autenticacao");

  // Rota de listagem
  router.get("/mostrar", PegarTokenUsuario, (req, res) => {
      const UsuarioID = req.user.id;
      connection.query("SELECT * FROM Clientes WHERE UsuarioID = ?", [UsuarioID], (err, results) => {
        if (err) {
          console.error("Erro ao buscar registros", err);
          res.status(500).send("Erro ao buscar registros");
        } else {
          res.json(results);
        }
      });
  });

  // Rota de cadastro
  router.post("/cadastrar", PegarTokenUsuario, (req, res) => {
      const { Nome, NomeSocial, Genero, CPF} = req.body;
      const UsuarioID = req.user.id;
    
      // Verificar se já existe um cliente com o mesmo nome ou CPF para o mesmo usuário
      const queryVerificacao = "SELECT * FROM Clientes WHERE Nome = ? OR CPF = ? AND UsuarioID = ?";
      connection.query(queryVerificacao, [Nome, CPF, UsuarioID], (err, results) => {
        if (err) {
          console.error("Erro ao verificar cliente", err);
          res.status(500).send("Erro ao verificar cliente");
        } else if (results.length > 0) {
          // Se encontrar um cliente com o mesmo nome ou CPF enviar uma resposta de erro
          res.status(400).send("Já existe um cliente com o mesmo nome ou CPF");
        } else {
          // Se não encontrar, prosseguir com o cadastro
          const queryCadastro = "INSERT INTO Clientes (Nome, NomeSocial, Genero, CPF, UsuarioID) VALUES (?, ?, ?, ?, ?)";
          const values = [Nome, NomeSocial, Genero, CPF, UsuarioID];
    
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
  router.put("/editar/:id", PegarTokenUsuario, (req, res) => {
      const { Nome, NomeSocial, Genero, CPF} = req.body;
      const UsuarioID = req.user.id;
      const idParam = req.params.id;
  
      // Verificar se já existe um cliente com o mesmo ID para o mesmo usuário
      const queryVerificacao = "SELECT * FROM Clientes WHERE ID = ? AND UsuarioID = ?";
      connection.query(queryVerificacao, [idParam, UsuarioID], (err, results) => {
          if (err) {
              console.error("Erro ao verificar cliente", err);
              res.status(500).send("Erro ao verificar cliente");
          } else if (results.length === 0) {
              // Se não encontrar um cliente com o mesmo ID enviar uma resposta de erro
              res.status(400).send("Não existe um cliente com este ID");
          } else {
              // Se encontrar, prosseguir com a edição
              const queryEdicao = "UPDATE Clientes SET Nome = ?, NomeSocial = ?, Genero = ?, CPF = ? WHERE ID = ? AND UsuarioID = ?";
              const values = [Nome, NomeSocial, Genero, CPF, idParam, UsuarioID];
  
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
  router.delete("/deletar/:id", PegarTokenUsuario, (req, res) => {
      const UsuarioID = req.user.id;
      let comando = `DELETE FROM Clientes WHERE ID = ${req.params.id} AND UsuarioID = ${UsuarioID}`;
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
