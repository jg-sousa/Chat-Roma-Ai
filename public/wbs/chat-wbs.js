const wbs = require("ws");
const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
    file = fs.readFileSync("./chat-wbs.html"); // Certifique-se de que o caminho para o arquivo HTML está correto
    res.end(file);
});

const ws = new wbs.Server({ server });

ws.on("connection", (skt) => {
    skt.on("message", (msg) => {
        console.log(msg.toString('utf-8')); // Mostrar a mensagem no console
        ws.clients.forEach((client) => {
            client.send(msg); // Enviar a mensagem para todos os clientes conectados
        });
    });
});

server.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
