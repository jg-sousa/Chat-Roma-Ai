const express = require('express');
const axios = require('axios');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai'); // Import OpenAI SDK
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Certifique-se de que sua chave esteja em .env
});
const openai = new OpenAIApi(configuration);

// Função auxiliar para buscar imagem de API pública
async function fetchImage(url) {
    try {
        const response = await axios.get(url);
        return response.data[0]?.url || response.data.image || response.data.message;  // Extrai URL da imagem conforme a estrutura da API
    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
        return null;
    }
}

// Rota para geração de imagens com OpenAI
app.post('/api/openai/image', async (req, res) => {
    const { prompt } = req.body; // Espera receber um prompt no corpo da requisição
    if (!prompt) {
        return res.status(400).json({ error: 'O campo "prompt" é obrigatório.' });
    }

    try {
        const response = await openai.createImage({
            prompt,
            n: 1, // Gera uma imagem
            size: "512x512", // Dimensão da imagem
        });
        const imageUrl = response.data.data[0].url;
        res.json({ imageUrl }); // Retorna a URL da imagem gerada
    } catch (error) {
        console.error("Erro ao gerar imagem com OpenAI:", error.message);
        res.status(500).json({ error: "Erro ao gerar imagem." });
    }
});

// Rota para imagem de gatos
app.post('/api/cat', async (req, res) => {
    const imageUrl = await fetchImage('https://api.thecatapi.com/v1/images/search');
    res.json(imageUrl);
});

// Rota para imagem de cachorros
app.post('/api/dog', async (req, res) => {
    const imageUrl = await fetchImage('https://dog.ceo/api/breeds/image/random');
    res.json(imageUrl);
});

// Rota para imagem de raposas
app.post('/api/fox', async (req, res) => {
    const imageUrl = await fetchImage('https://randomfox.ca/floof/');
    res.json(imageUrl);
});

// Rota para API pública extra (exemplo: imagens de patos)
app.post('/api/duck', async (req, res) => {
    const imageUrl = await fetchImage('https://random-d.uk/api/random');
    res.json(imageUrl);
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
