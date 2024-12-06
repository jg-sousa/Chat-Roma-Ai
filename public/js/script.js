document.getElementById("sendBtn").addEventListener("click", sendCommand);
document.getElementById("generateCatBtn").addEventListener("click", generateCatImage);
document.getElementById("generateDogBtn").addEventListener("click", generateDogImage);
document.getElementById("generateFoxBtn").addEventListener("click", generateFoxImage);
document.getElementById("generateDuckBtn").addEventListener("click", generateDuckImage);
document.getElementById("generateAIImageBtn").addEventListener("click", generateAIImage);

// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Definir o botão de envio
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatContainer = document.getElementById('chat');
  
    // Função para gerar e adicionar mensagens no chat
    function addMessage(content, sender = 'user') {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', sender);
      messageDiv.innerHTML = content;
      chatContainer.appendChild(messageDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  
    // Função para enviar o comando via botão
    sendBtn.addEventListener('click', () => {
      const userInput = chatInput.value.trim();
      if (userInput) {
        addMessage(userInput, 'user');
        handleUserInput(userInput);
        chatInput.value = '';
      }
    });
  
    // Função para enviar o comando via Enter (tecla Enter também pode ser usada)
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const userInput = chatInput.value.trim();
        if (userInput) {
          addMessage(userInput, 'user');
          handleUserInput(userInput);
          chatInput.value = '';
        }
      }
    });
  
    // Função que manipula a entrada do usuário e executa a ação correspondente
    async function handleUserInput(input) {
      // Checar qual comando foi digitado e agir de acordo
if (input.startsWith("/openai")) {
        const prompt = input.split(" ").slice(1).join(" "); // Extrair o prompt para OpenAI
  
        if (prompt) {
          await generateOpenAIImage(prompt);
        } else {
          addMessage("Por favor, forneça um prompt para gerar uma imagem.", "system");
        }
      } else {
        addMessage("Comando não reconhecido. Tente /image ou /openai.", "system");
      }
    }
  
    // Função para chamar a API de imagens
    async function generateImage(apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, { method: 'POST' });
        const data = await response.json();
        if (data.url) {
          addMessage(`<img src="${data.url}" alt="Imagem">`, 'system');
        } else {
          addMessage("Erro ao gerar imagem. Tente novamente.", "system");
        }
      } catch (error) {
        console.error("Erro na API de imagens:", error);
        addMessage("Erro ao gerar imagem. Tente novamente.", "system");
      }
    }
  
    // Função para chamar a API OpenAI para gerar imagens
    async function generateOpenAIImage(prompt) {
      try {
        const response = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
        });
  
        const data = await response.json();
        if (data.url) {
          addMessage(`<img src="${data.url}" alt="Imagem gerada">`, 'system');
        } else {
          addMessage("Erro ao gerar imagem com OpenAI. Tente novamente.", "system");
        }
      } catch (error) {
        console.error("Erro na API OpenAI:", error);
        addMessage("Erro ao gerar imagem com OpenAI. Tente novamente.", "system");
      }
    }
  });
  