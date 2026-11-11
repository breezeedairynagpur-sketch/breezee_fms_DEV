
// import cds from '@sap/cds';
// import pool from '../db/mysql.js';

// export default cds.service.impl(function () {

//     this.on('READ', 'AppSettings', async (req) => {

//         try {

//             const [rows] = await pool.query(
//                 'SELECT * FROM app_settings'
//             );

//             return rows;

//         } catch (error) {

//             console.error('MySQL Error:', error);

//             return req.reject(
//                 500,
//                 'Unable to fetch app_setting records'
//             );

//         }

//     });

// });



import cds from '@sap/cds';
import pool, { testDbConnection } from '../db/mysql.js';

export default cds.service.impl(function () {

  this.on('READ', 'AppSettings', async (req) => {

    try {
      console.log('[AppSettings] Starting database read...');

      // Verify database connectivity
      const connected = await testDbConnection();

      if (!connected) {
        return req.reject(503, 'MariaDB connection failed. Check Render logs.');
      }

      // Fetch application settings
      const [rows] = await pool.query(
        'SELECT * FROM app_settings'
      );

      console.log(
        `[AppSettings] Successfully fetched ${rows.length} records`
      );

      return rows;

    } catch (error) {

      console.error('[AppSettings] Database query failed:', {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        message: error.message
      });

      return req.reject(
        500,
        `Unable to fetch app_settings: ${error.code || error.message}`
      );
    }

  });

});
