
// import mysql from 'mysql2/promise';
// import 'dotenv/config';

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     port: Number(process.env.MYSQL_PORT),
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,

//     ssl: {
//         rejectUnauthorized: true
//     },

//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     connectTimeout: 30000
// });

// export default pool;

import mysql from 'mysql2/promise';

const required = [
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE'
];

const missing = required.filter(key => !process.env[key]);

if (missing.length) {
  throw new Error(
    `Missing MySQL environment variables: ${missing.join(', ')}`
  );
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 15000
});

export async function testDbConnection() {
  let connection;

  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query(
      'SELECT DATABASE() AS db, VERSION() AS version'
    );

    console.log('MariaDB connected successfully:', rows[0]);

    return true;

  } catch (error) {
    console.error('MariaDB connection failed:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.message
    });

    return false;

  } finally {
    if (connection) connection.release();
  }
}
export default pool;