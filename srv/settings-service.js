
import cds from '@sap/cds';
import pool from '../db/mysql.js';

export default cds.service.impl(function () {

    this.on('READ', 'AppSettings', async (req) => {

        try {

            const [rows] = await pool.query(
                'SELECT * FROM app_settings'
            );

            return rows;

        } catch (error) {

            console.error('MySQL Error:', error);

            return req.reject(
                500,
                'Unable to fetch app_setting records'
            );

        }

    });

});
