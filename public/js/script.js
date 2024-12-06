// Função para exibir a mensagem no chat
function displayMessage(message, sender) {
    const chatDiv = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatDiv.appendChild(messageDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight; // Rolagem automática para o final
}

// Função para exibir a imagem de gato
function displayCatImage() {
    displayLoading();  // Mostra o loading enquanto a imagem é carregada
    const imgElement = document.createElement('img');
    imgElement.src = 'https://cataas.com/cat';  // URL para obter imagem de gato
    imgElement.alt = "Gato";
    imgElement.onload = function() {
        removeLoading();  // Remove o loading após a imagem ser carregada
        document.getElementById('chat').appendChild(imgElement);
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
            imgElement.onload = function() {
                removeLoading();  // Remove o loading após a imagem ser carregada
                document.getElementById('chat').appendChild(imgElement);
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
            imgElement.onload = function() {
                removeLoading();  // Remove o loading após a imagem ser carregada
                document.getElementById('chat').appendChild(imgElement);
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

// Função para exibir a imagem de pato
function displayDuckImage() {
    displayLoading();  // Mostra o loading enquanto a imagem é carregada
    fetch('https://random-d.uk/api/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.url;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Pato";
            imgElement.onload = function() {
                removeLoading();  // Remove o loading após a imagem ser carregada
                document.getElementById('chat').appendChild(imgElement);
            };
            imgElement.onerror = function() {
                removeLoading();  // Remove o loading caso haja erro no carregamento da imagem
                displayMessage("Erro ao carregar a imagem de pato.", 'bot');
            };
        })
        .catch(error => {
            removeLoading();  // Remove o loading caso ocorra um erro na requisição
            displayMessage("Erro ao pegar a imagem de pato: " + error, 'bot');
        });
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

// Função para tocar som baseado no comando
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.play();
    }
}

// Função para capturar o input do chat e detectar o Enter
document.getElementById("chatInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Quando pressionar Enter
        event.preventDefault();  // Evita o comportamento padrão (para que o campo de input não seja limpo automaticamente)

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
        } else if (userInput === "/image duck") {
            displayDuckImage();  // Exibe a imagem de pato
            displayMessage("Aqui está a imagem de um pato!", 'bot');
        } else if (userInput === "/sound cat") {
            playSound('catSound');  // Toca o som de gato
            displayMessage("Aqui está o som de um gato!", 'bot');
        } else if (userInput === "/sound dog") {
            playSound('dogSound');  // Toca o som de cachorro
            displayMessage("Aqui está o som de um cachorro!", 'bot');
        } else if (userInput === "/sound fox") {
            playSound('foxSound');  // Toca o som de raposa
            displayMessage("Aqui está o som de uma raposa!", 'bot');
        } else if (userInput === "/sound duck") {
            playSound('duckSound');  // Toca o som de pato
            displayMessage("Aqui está o som de um pato!", 'bot');
        } else if (userInput === "/sound gun") {
            playSound('gunSound');
            displayMessage("Aqui está o som de uma arma do Star Wars!", 'bot');
        } else if (userInput === "/sound mario") {
            playSound('marioSound'); 
            displayMessage("Aqui está o som do Mario!", 'bot');
        } else if (userInput === "/sound wow") {
            playSound('wowSound'); 
            displayMessage("Wowwwwwwwww!", 'bot');
        } else if (userInput === "/sound boy") {
            playSound('boySound');
            displayMessage("Yeah boyyyyy", 'bot');
        } else {
            displayMessage("Comando não reconhecido. Tente /image cat, /image dog, /image fox, /image duck, ou /sound cat, /sound dog, /sound fox, /sound duck.", 'bot');
        }

        // Limpa o campo de input após enviar a mensagem
        event.target.value = "";
    }
});

// Função para capturar o clique do botão de envio
document.getElementById("sendBtn").addEventListener("click", function() {
    const userInput = document.getElementById("chatInput").value.toLowerCase().trim();

    if (userInput !== "") {
        // Exibe a mensagem do usuário no chat
        displayMessage(userInput, 'user');

        // Verifica o comando e executa a ação
        if (userInput === "/image cat") {
            displayCatImage();
            displayMessage("Aqui está a imagem de um gato!", 'bot');
        } else if (userInput === "/image dog") {
            displayDogImage();
            displayMessage("Aqui está a imagem de um cachorro!", 'bot');
        } else if (userInput === "/image fox") {
            displayFoxImage();
            displayMessage("Aqui está a imagem de uma raposa!", 'bot');
        } else if (userInput === "/image duck") {
            displayDuckImage();
            displayMessage("Aqui está a imagem de um pato!", 'bot');
        } else if (userInput === "/sound cat") {
            playSound('catSound');
            displayMessage("Aqui está o som de um gato!", 'bot');
        } else if (userInput === "/sound dog") {
            playSound('dogSound');
            displayMessage("Aqui está o som de um cachorro!", 'bot');
        } else if (userInput === "/sound fox") {
            playSound('foxSound');
            displayMessage("Aqui está o som de uma raposa!", 'bot');
        } else if (userInput === "/sound duck") {
            playSound('duckSound');
            displayMessage("Aqui está o som de um pato!", 'bot');
        } else if (userInput === "/sound gun") {
            playSound('gunSound');
            displayMessage("Aqui está o som de uma arma do Star Wars!", 'bot');
        } else if (userInput === "/sound mario") {
            playSound('marioSound'); 
            displayMessage("Aqui está o som do Mario!", 'bot');
        } else if (userInput === "/sound wow") {
            playSound('wowSound'); 
            displayMessage("Wowwwwwwwww!", 'bot');
        } else if (userInput === "/sound boy") {
            playSound('boySound');
            displayMessage("Yeah boyyyyy", 'bot');
        } else {
            displayMessage("Comando não reconhecido. Tente /image cat, /image dog, /image fox, /image duck, ou /sound cat, /sound dog, /sound fox, /sound duck.", 'bot');
        }

        // Limpa o campo de input após enviar a mensagem
        document.getElementById("chatInput").value = "";
    }
});

