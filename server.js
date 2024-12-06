const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Função auxiliar para buscar imagem de API pública
async function fetchImage(url) {
    try {
        const response = await axios.get(url);
        return response.data[0]?.url || response.data.image || response.data.message;
    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
        return null;
    }
}

// Rota para imagem de gatos
app.post('/api/cat', async (req, res) => {
    console.log("Rota /api/cat chamada");
    const imageUrl = await fetchImage('https://api.thecatapi.com/v1/images/search');
    res.json(imageUrl);
});

// Rota para imagem de cachorros
app.post('/api/dog', async (req, res) => {
    console.log("Rota /api/dog chamada");
    const imageUrl = await fetchImage('https://dog.ceo/api/breeds/image/random');
    res.json(imageUrl);
});

// Rota para imagem de raposas
app.post('/api/fox', async (req, res) => {
    console.log("Rota /api/fox chamada");
    const imageUrl = await fetchImage('https://randomfox.ca/floof/');
    res.json(imageUrl);
});

// Rota para imagem de patos
app.post('/api/duck', async (req, res) => {
    console.log("Rota /api/duck chamada");
    const imageUrl = await fetchImage('https://random-d.uk/api/random');
    res.json(imageUrl);
});

// Rota para gerar imagem com OpenAI
app.post('/api/openai-image', async (req, res) => {
    console.log("Rota /api/openai-image chamada com prompt:", req.body.prompt);
    const { prompt } = req.body;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt,
                n: 1,
                size: '1024x1024',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );
        console.log("Imagem gerada com sucesso:", response.data.data[0].url);
        res.json(response.data.data[0].url);
    } catch (error) {
        console.error('Erro ao gerar imagem com OpenAI:', error.response?.data || error.message || error);
        if (error.response && error.response.data) {
            res.status(500).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Erro ao gerar imagem com OpenAI' });
        }
    }
});

// Servir login.html na rota /login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Servir index.html na rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
