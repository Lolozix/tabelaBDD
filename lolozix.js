const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5001;

// Configuração da conexão com o banco de dados
const pool = new Pool({
  connectionString: "postgres://postgres:1402@localhost:5432/lorrana",
});

// Middleware
app.use(express.json());
app.use(cors());

// Função para conectar ao banco de dados
const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err);
    process.exit(1); // Encerra o servidor se não conseguir conectar ao banco de dados
  }
};

// Rota para buscar alunos
app.get("/alunos", async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM alunos');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar dados da tabela alunos:", error);
    res.status(400).json({ error: error.message });
  }
});

// Função para encerrar a conexão com o banco ao sair
const closeDatabaseConnection = async () => {
  await pool.end();
  console.log('Conexão com o banco de dados encerrada.');
  process.exit(0);
};

// Conectando ao banco de dados e iniciando o servidor
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});

// Encerrando a conexão ao receber sinal de interrupção
process.on('SIGINT', closeDatabaseConnection);
