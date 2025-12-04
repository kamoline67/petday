const { Sequelize } = require('sequelize');

const conexao = new Sequelize(
  process.env.DB_NAME || 'dbpetday',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'escola',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
    retry: {
      max: 10,
      timeout: 30000
    }
  }
);

conexao.authenticate()
  .then(() => {
    console.log('Banco de dados inicializado.');
  })
  .catch(err => {
    console.error('Erro ao conectar com MySQL.', err);
  });

module.exports = conexao;
