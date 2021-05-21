const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'junanago94',
        database: 'face_app'
    }
});

module.exports = knex;