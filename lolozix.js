const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://postgres:aluno@localhost:5432/lorranalinda"
  }
);

async function listarLolo() {
  try {
    const result = await pool.query("SELECT * FROM lolo");
    console.log("Usuários:", result.rows);
  }

  catch (error) {
    console.error("Erro ao listar usuários:", error);
  }
}

listarLolo();