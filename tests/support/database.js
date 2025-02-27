const { Pool } = require('pg');

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
};

export async function executeSQL(sqlScript) {
    const pool = new Pool(DbConfig);
    const client = await pool.connect(); // Adicione o `await` aqui

    try {
        const result = await client.query(sqlScript);
        console.log(result.rows);
    } catch (error) {
        console.log('Erro ao executar SQL: ' + error);
        throw error; // Lança o erro para interromper o teste
    } finally {
        client.release(); // Libera o cliente de volta para o pool
    }
}