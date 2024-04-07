const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const users = [
    { username: 'pablomarcal', password: 'como' },
    { username: 'usuario2', password: 'senha2' },
];

// Rota para a página de login (GET)
app.get('/login', (req, res) => {
    // Renderizar a página de login
    res.sendFile(__dirname + '/login.html');
});

// Rota para o processo de login (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Credenciais válidas, redireciona para pm.html
        res.redirect('/pm.html');
    } else {
        // Credenciais inválidas, redireciona para a página de login
        res.redirect('/index.html');
    }
});

// Iniciar o servidor 
app.listen(3000, () => {
    console.log('Servidor iniciado em http://localhost:5500');
});
