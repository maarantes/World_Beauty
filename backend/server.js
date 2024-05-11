const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mariobros123",
  database: "CRUD"
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados MySQL", err);
  } else {
    console.log("Conectado ao banco de dados MySQL");
  }
});

const rotasClientes = require("./rotas/rotasClientes")(connection);
const rotasProdutos = require("./rotas/rotasProdutos")(connection);
const rotasServicos = require("./rotas/rotasServicos")(connection);

app.use("/clientes", rotasClientes);
app.use("/produtos", rotasProdutos);
app.use("/servicos", rotasServicos);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
