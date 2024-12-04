// Função para exibir a mensagem no chat
function displayMessage(message, sender) {
    const chatDiv = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatDiv.appendChild(messageDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight; // Rolagem automática para o final
}

// Função para exibir o loading
function displayLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    loadingElement.textContent = 'Carregando...';
    document.getElementById('chat').appendChild(loadingElement);
}

// Função para remover o loading
function removeLoading() {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Função para exibir a imagem de gato
function displayCatImage() {
    displayLoading();  // Mostra o loading enquanto a imagem é carregada
    const imgElement = document.createElement('img');
    imgElement.src = 'https://cataas.com/cat';  // URL para obter imagem de gato
    imgElement.alt = "Gato";
    imgElement.style.width = "200px";  // Define a largura fixa
    imgElement.style.height = "auto";  // Mantém a proporção
    imgElement.onload = function() {
        removeLoading();  // Remove o loading após a imagem ser carregada
        document.getElementById('chat').appendChild(imgElement);
        playSound('catSound');  // Toca o som de gato
    };
    imgElement.onerror = function() {
        removeLoading();  // Remove o loading caso haja erro no carregamento da imagem
        displayMessage("Erro ao carregar a imagem de gato.", 'bot');
    };
}

// Função para exibir a imagem de cachorro
function displayDogImage() {
    displayLoading();  // Mostra o loading enquanto a imagem é carregada
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Cachorro";
            imgElement.style.width = "200px";  // Define a largura fixa
            imgElement.style.height = "auto";  // Mantém a proporção
            imgElement.onload = function() {
                removeLoading();  // Remove o loading após a imagem ser carregada
                document.getElementById('chat').appendChild(imgElement);
                playSound('dogSound');  // Toca o som de cachorro
            };
            imgElement.onerror = function() {
                removeLoading();  // Remove o loading caso haja erro no carregamento da imagem
                displayMessage("Erro ao carregar a imagem de cachorro.", 'bot');
            };
        })
        .catch(error => {
            removeLoading();  // Remove o loading caso ocorra um erro na requisição
            displayMessage("Erro ao pegar a imagem de cachorro: " + error, 'bot');
        });
}

// Função para exibir a imagem de raposa
function displayFoxImage() {
    displayLoading();  // Mostra o loading enquanto a imagem é carregada
    fetch('https://randomfox.ca/floof/')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.image;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Raposa";
            imgElement.style.width = "200px";  // Define a largura fixa
            imgElement.style.height = "auto";  // Mantém a proporção
            imgElement.onload = function() {
                removeLoading();  // Remove o loading após a imagem ser carregada
                document.getElementById('chat').appendChild(imgElement);
                playSound('foxSound');  // Toca o som de raposa
            };
            imgElement.onerror = function() {
                removeLoading();  // Remove o loading caso haja erro no carregamento da imagem
                displayMessage("Erro ao carregar a imagem de raposa.", 'bot');
            };
        })
        .catch(error => {
            removeLoading();  // Remove o loading caso ocorra um erro na requisição
            displayMessage("Erro ao pegar a imagem de raposa: " + error, 'bot');
        });
}

// Função para exibir a imagem de coelho
function displayBunnyImage() {
    displayLoading();  // Mostra o loading enquanto a imagem é carregada
    fetch('https://api.bunnies.io/v2/loop/random/?media=gif')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.media.gif;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Coelho";
            imgElement.style.width = "200px";  // Define a largura fixa
            imgElement.style.height = "auto";  // Mantém a proporção
            imgElement.onload = function() {
                removeLoading();  // Remove o loading após a imagem ser carregada
                document.getElementById('chat').appendChild(imgElement);
                playSound('bunnySound');  // Toca o som de coelho
            };
            imgElement.onerror = function() {
                removeLoading();  // Remove o loading caso haja erro no carregamento da imagem
                displayMessage("Erro ao carregar a imagem de coelho.", 'bot');
            };
        })
        .catch(error => {
            removeLoading();  // Remove o loading caso ocorra um erro na requisição
            displayMessage("Erro ao pegar a imagem de coelho: " + error, 'bot');
        });
}

// Função para tocar som
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

// Função para capturar o input do chat e detectar o Enter
document.getElementById("chatInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {  // Quando pressionar Enter
        const userInput = event.target.value.toLowerCase().trim();

        // Exibe a mensagem do usuário no chat
        displayMessage(userInput, 'user');

        // Verifica o comando e executa a ação
        if (userInput === "/image cat") {
            displayCatImage();  // Exibe a imagem de gato
            displayMessage("Aqui está a imagem de um gato!", 'bot');
        } else if (userInput === "/image dog") {
            displayDogImage();  // Exibe a imagem de cachorro
            displayMessage("Aqui está a imagem de um cachorro!", 'bot');
        } else if (userInput === "/image fox") {
            displayFoxImage();  // Exibe a imagem de raposa
            displayMessage("Aqui está a imagem de uma raposa!", 'bot');
        } else if (userInput === "/image bunny") {
            displayBunnyImage();  // Exibe a imagem de coelho
            displayMessage("Aqui está a imagem de um coelho!", 'bot');
        } else {
            displayMessage("Comando não reconhecido. Tente /image cat, /image dog, /image fox ou /image bunny.", 'bot');
        }

        // Limpa o campo de input após enviar a mensagem
        event.target.value = "";
    }
});
