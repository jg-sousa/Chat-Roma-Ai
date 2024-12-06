// server.js

const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai'); // Biblioteca da OpenAI
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8080;

// Configurar o parser para JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Para servir arquivos estáticos (como CSS, JS, etc.)

// Instância do cliente OpenAI
const openai = new OpenAI({
  apiKey: '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', // Substitua com sua chave de API da OpenAI
});

// Endpoint para gerar imagem de Gato
app.post('/api/cat', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro ao gerar imagem de gato:", error);
    res.status(500).send("Erro ao gerar imagem de gato.");
  }
});

// Endpoint para gerar imagem de Cachorro
app.post('/api/dog', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const imageUrl = response.data.message;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro ao gerar imagem de cachorro:", error);
    res.status(500).send("Erro ao gerar imagem de cachorro.");
  }
});

// Endpoint para gerar imagem de Raposa
app.post('/api/fox', async (req, res) => {
  try {
    const response = await axios.get('https://randomfox.ca/floof/');
    const imageUrl = response.data.image;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro ao gerar imagem de raposa:", error);
    res.status(500).send("Erro ao gerar imagem de raposa.");
  }
});

// Endpoint para gerar imagem de Pato
app.post('/api/duck', async (req, res) => {
  try {
    const response = await axios.get('https://random-d.uk/api/v2/random');
    const imageUrl = response.data.url;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro ao gerar imagem de pato:", error);
    res.status(500).send("Erro ao gerar imagem de pato.");
  }
});

// Endpoint para gerar imagem via OpenAI
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body; // Recebe o prompt de descrição da imagem
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024', // Tamanho da imagem
    });
    const imageUrl = response.data[0].url;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro ao gerar imagem via OpenAI:", error);
    res.status(500).send("Erro ao gerar imagem via OpenAI.");
  }
});

// Servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
