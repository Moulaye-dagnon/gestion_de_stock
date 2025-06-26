require("dotenv").config();
const fs = require("fs");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
//   ssl: {
//     ca: fs.readFileSync("./ca.pem"), // Assure-toi que ce fichier contient le bon certificat
//   },
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connexion à la base de données réussie");
    connection.release();
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    process.exit(1);
  }
}

testConnection();

module.exports = pool;
