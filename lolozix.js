const express = require('express');
const { Pool } = require('pg');
const app = express();
require('dotenv').config();
const port = 5000;
app.use(express.json());

//Começa a conexão do banco de dados com o expresse com a senha do meu postgre,usuário,localhost e o banco 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// Rota para a raiz
app.get('/usuarios', (req, res) => {
  res.send('Rodando o BACKEND com BANCO DE DADOS');
});

// Rota para listar usuários
app.get('/', async (req, res) => {
  try {
    //O metodo query apresenta os dados do banco,ele executa comandos SQL no exemplo utilizei o * para listar todos os dados dos usuários
    const result = await pool.query('SELECT * FROM tabelona');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar dados, e agora Silver?:', error);
    res.status(500).json({ error: 'Erro ao buscar dados, e agora Silver?' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});