const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')
const path = require('path');
const favicon = require('serve-favicon')

//middleware
app.use(express.json({ limit:'20mb' }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'))
readdirSync('./routes').map((item) => app.use('/api', require('./routes/' + item)))

app.get('/api', (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username)
        console.log(password)
        res.send("Welcome to my api")
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
})

app.get('/', (req, res) => {
    try {
        res.send("Hellow API")
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
})

app.listen(5555, () => {
    console.log("Server started on port 5555")
})