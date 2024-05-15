const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (connection) => {
    const express = require("express");
    const router = express.Router();

    router.post("/cadastrar", async (req, res) => {
        const { email, senha } = req.body;
    
        // Verificar se já existe um usuário com o mesmo email
        const queryVerificacao = "SELECT * FROM Usuarios WHERE Email = ?";
        connection.query(queryVerificacao, [email], async (err, results) => {
            if (err) {
                console.error("Erro ao verificar usuário", err);
                res.status(500).send("Erro ao verificar usuário");
            } else if (results.length > 0) {
                // Se encontrar um usuário com o mesmo email, enviar uma resposta de erro
                res.status(400).send("Já existe um usuário com o mesmo email");
            } else {
                // Se não encontrar, prosseguir com o cadastro
                const saltRounds = 10;
                const senhaHash = await bcrypt.hash(senha, saltRounds);
    
                const queryCadastro = "INSERT INTO Usuarios (Email, Senha) VALUES (?, ?)";
                const values = [email, senhaHash];
    
                connection.query(queryCadastro, values, (err, results) => {
                    if (err) {
                        console.error("Erro ao cadastrar usuário", err);
                        res.status(500).send("Erro ao cadastrar usuário");
                    } else {
                        const token = jwt.sign({ id: results.insertId }, "world_beauty", { expiresIn: "2h" });
                        res.status(201).send({ message: "Usuário cadastrado com sucesso!", token });
                    }
                });
            }
        });
    });


    router.post("/login", async (req, res) => {
        const { email, senha } = req.body;
    
        // Buscar o usuário pelo email
        const query = "SELECT * FROM Usuarios WHERE Email = ?";
        connection.query(query, [email], async (err, results) => {
            if (err) {
                console.error("Erro ao buscar usuário", err);
                res.status(500).send("Erro ao buscar usuário");
            } else if (results.length === 0) {
                // Se não encontrar um usuário com o email fornecido, enviar uma resposta de erro
                res.status(400).send("Usuário não encontrado");
            } else {
                // Se encontrar o usuário, verificar a senha
                const usuario = results[0];
                const senhaCorreta = await bcrypt.compare(senha, usuario.Senha);
    
                if (senhaCorreta) {
                    // Se a senha estiver correta, criar um token JWT para o usuário
                    const token = jwt.sign({ id: usuario.ID }, "world_beauty", { expiresIn: "1h" });
                    res.status(200).send({ message: "Login realizado com sucesso!", token });
                } else {
                    // Se a senha estiver incorreta, enviar uma resposta de erro
                    res.status(400).send("Senha incorreta");
                }
            }
        });
    });






    return router;

};

