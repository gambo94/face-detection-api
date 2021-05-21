const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'us-cdbr-east-03.cleardb.com',
        user: 'be00dc3b353b68',
        password: '57e6226e',
        database: 'heroku_b584b1c124b0c6e'
    }
});

module.exports = knex;