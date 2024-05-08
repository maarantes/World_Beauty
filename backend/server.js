const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const app = express();
const port = 5000;

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

const routes = require("./routes")(connection);
app.use(express.json());
app.use(cors());
app.use("/", routes);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});