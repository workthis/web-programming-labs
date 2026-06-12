const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: 'postgres',
  });

  await client.connect();
  await client.query(`CREATE DATABASE ${process.env.DB_NAME};`);
  console.log(`База даних "${process.env.DB_NAME}" створена!`);
  await client.end();
}

main().catch(err => {
  if (err.code === '42P04') {
    console.log('База даних вже існує, продовжуємо...');
  } else {
    console.error('Помилка:', err.message);
  }
});