const express = require('express')
const path = require("path")
const client_path = path.join(__dirname +"/.."+ "/client")
const app = express()
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/list');
const port = 3000
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors.apply())
app.use('/api/users', userRoutes);
app.use('/api/list', listRoutes);

app.use(express.static(path.join(__dirname, "../client")))

app.get("/nav.html", (req,res) => {
    res.sendFile(path.join(__dirname, "../client/nav/nav.html"))
})

app.get("/nav.css", (req,res) => {
    res.sendFile(path.join(__dirname, "../client/nav/nav.css"))
})


app.get('/', (req,res) => {
    res.sendFile(path.join(client_path, 'pages/index.html'))
})


app.get('/login', (req,res) => {
    res.sendFile(path.join(client_path, 'pages/login.html'))
})

app.get('/signup', (req,res) => {
    res.sendFile(path.join(client_path, 'pages/signup.html'))
})

app.get('/groceries', (req,res) => {
    res.sendFile(path.join(client_path, 'pages/groceries.html'))
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(client_path, 'pages', '404.html'));
});

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`)
})