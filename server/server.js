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
        return response.data[0]?.url || response.data.image || response.data.message;  // Extrai URL da imagem conforme a estrutura da API
    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
        return null;
    }
}

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
