const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senha123',
  database: process.env.DB_NAME || 'testdb'
});

app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao conectar ao banco de dados: ' + err.message);
    } else {
      res.send(`Conexão bem-sucedida! Resultado do banco: ${results[0].solution}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Aplicação rodando na porta 3000');
});
