const express = require('express')
const bodyParser = require('body-parser')
const client = require('./connection')

const app = express()
const port = 3100

app.use(bodyParser.json())
app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})

client.connect(err => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Connected")
    }
})

app.get('/users_game', (req, res) => {
    client.query(`Select * from users_game`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
})

app.post('/users_game', (req, res) => {
    const { username, password } = req.body

    client.query((`insert into users_game(username,password) values('${username}', '${password}')`), (err, result) => {
        if (!err) {
            res.send("Insert success")
        } else {
            res.send(err.message)
        }
    })

})

app.put('/users_game/:id', (req, res) => {
    const { username, password } = req.body

    client.query((`update users_game set username = '${username}', password = '${password}'`), (err, result) => {
        if (!err) {
            res.send('Update success')
        } else {
            res.send(err.message)
        }
    })
})

app.delete('/users_game/:id', (req, res) => {

    client.query((`delete from users_game where id = '${req.params.id}'`), (err, result) => {
        if (!err) {
            res.send('Deleted!')
        } else {
            res.send(err.message)
        }
    })
})