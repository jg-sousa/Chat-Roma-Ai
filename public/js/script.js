// Função para exibir a mensagem no chat
function displayMessage(message, sender) {
    const chatDiv = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatDiv.appendChild(messageDiv);
    chatDiv.scrollTop = chatDiv.scrollHeight; // Rolagem automática para o final
}

// Função para exibir a imagem de um animal
function displayCatImage() {
    const imgElement = document.createElement('img');
    imgElement.src = 'https://cataas.com/cat';  // URL para obter imagem de gato
    imgElement.alt = "Gato";
    document.getElementById('chat').appendChild(imgElement);
    playSound('catSound');  // Toca o som de gato
}

function displayDogImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Cachorro";
            document.getElementById('chat').appendChild(imgElement);
            playSound('dogSound');  // Toca o som de cachorro
        })
        .catch(error => console.error('Erro ao pegar a imagem de cachorro:', error));
}

function displayFoxImage() {
    fetch('https://randomfox.ca/floof/')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.image;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = "Raposa";
            document.getElementById('chat').appendChild(imgElement);
            playSound('foxSound');  // Toca o som de raposa
        })
        .catch(error => console.error('Erro ao pegar a imagem de raposa:', error));
}

function displayDuckImage() {
    const imgElement = document.createElement('img');
    imgElement.src = 'https://random-d.uk/api/v1/randomimage'; // URL de pato
    imgElement.alt = "Pato";
    document.getElementById('chat').appendChild(imgElement);
    playSound('duckSound');  // Toca o som de pato
}

// Função para tocar som
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

// Captura o input do chat
document.getElementById("chatInput").addEventListener("keydown", function(event) {
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
        } else if (userInput === "/image duck") {
            displayDuckImage();  // Exibe a imagem de pato
            displayMessage("Aqui está a imagem de um pato!", 'bot');
        } else if (userInput === "/sound cat") {
            playSound('catSound');  // Toca o som do gato
            displayMessage("Som de gato tocado!", 'bot');
        } else if (userInput === "/sound dog") {
            playSound('dogSound');  // Toca o som do cachorro
            displayMessage("Som de cachorro tocado!", 'bot');
        } else if (userInput === "/sound fox") {
            playSound('foxSound');  // Toca o som da raposa
            displayMessage("Som de raposa tocado!", 'bot');
        } else if (userInput === "/sound duck") {
            playSound('duckSound');  // Toca o som do pato
            displayMessage("Som de pato tocado!", 'bot');
        } else {
            displayMessage("Comando não reconhecido. Tente /image cat, /image dog, /image fox, /image duck, /sound cat, /sound dog, /sound fox ou /sound duck.", 'bot');
        }

        // Limpa o input após o comando
        event.target.value = '';
    }
});
