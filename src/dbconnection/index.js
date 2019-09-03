const pg = require('pg');

const pool = pg.Pool({
    user : process.env.DBUSER,
    host : process.env.DBHOST,
    database : process.env.DBNAME,
    password : process.env.DBPASS,
    port : process.env.DBPORT
});

// const pool = pg.Pool({
//     user : 'postgres',
//     host : 'localhost',
//     database : 'db_news',
//     password : 'admin',
//     port : 5432
// });

module.exports = pool;