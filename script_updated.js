
document.addEventListener('DOMContentLoaded', function () {
    const generateImageButton = document.getElementById('generateImageButton');
    const imagePromptInput = document.getElementById('imagePrompt');
    const generatedImageContainer = document.getElementById('generatedImageContainer');

    if (generateImageButton) {
        generateImageButton.addEventListener('click', async () => {
            const prompt = imagePromptInput.value;
            if (!prompt) {
                alert('Por favor, insira um prompt para gerar a imagem!');
                return;
            }

            try {
                const response = await fetch('/api/openai/image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt }),
                });

                if (!response.ok) {
                    throw new Error('Erro ao gerar a imagem.');
                }

                const data = await response.json();
                generatedImageContainer.innerHTML = `<img src="${data.imageUrl}" alt="Imagem gerada" style="max-width: 100%; height: auto;">`;
            } catch (error) {
                console.error('Erro:', error);
                alert('Não foi possível gerar a imagem. Tente novamente mais tarde.');
            }
        });
    }
});
