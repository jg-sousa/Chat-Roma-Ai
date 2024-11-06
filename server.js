const express = require('express');
const app = express();
const path = require('path');

// Serve arquivos estáticos da pasta 'public' (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para retornar o chat.html
app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
