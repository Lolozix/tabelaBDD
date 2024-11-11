const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 8080;
app.use(express.json());

//Aki começa a conexão do banco de dados com o expresse com a senha do meu postgre,usuário,localhost e o banco 
const pool = new Pool({
  connectionString: "postgres://postgres:aluno@localhost:5432/lorrana2A",
})

// Rota para a raiz
app.get('/usuarios', (req, res) => {
  res.send('Rodando o BACKEND com BANCO DE DADOS');
});

// Rota para listar usuários
app.get('/', async (req, res) => {
  try {
      //O metodo query apresenta os dados do banco,ele executa comandos SQL no exemplo utilizei o * para listar todos os dados dos usuários
    const result = await pool.query('SELECT * FROM projeto_bancodedados');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar dados, é agora Silver:', error);
    res.status(500).json({ error: 'Erro ao buscar dados, é agora Silver' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});