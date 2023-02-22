const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 3000,
    password: "12345678",
    database: "crud"
})

module.exports = client