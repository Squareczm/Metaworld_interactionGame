// Keep the existing greetButton functionality for testing
document.getElementById('greetButton').addEventListener('click', function() {
    fetch('/api/greet')
        .then(response => response.json())
        .then(data => {
            document.getElementById('messageDisplay').textContent = data.message;
        })
        .catch(error => {
            console.error('Error fetching from backend:', error);
            document.getElementById('messageDisplay').textContent = 'Error connecting to backend (greet).';
        });
});

// Chat functionality
document.getElementById('sendMessageButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return; // Don't send empty messages

    const chatDisplay = document.getElementById('chatDisplay');
    const imageDisplay = document.getElementById('imageDisplay'); // Changed from imagePlaceholder

    // Display user's message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = `You: ${userInput}`;
    chatDisplay.appendChild(userMessageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to bottom

    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        // Display bot's response
        const botMessageDiv = document.createElement('div');
        botMessageDiv.textContent = `Bot: ${data.reply}`;
        chatDisplay.appendChild(botMessageDiv);

        // Display the image
        imageDisplay.innerHTML = ''; // Clear previous image/placeholder
        if (data.image_url) {
            const imgElement = document.createElement('img');
            imgElement.src = data.image_url;
            imgElement.alt = "Generated image";
            imgElement.style.maxWidth = "100%"; // Ensure image fits container
            imgElement.style.height = "auto";   // Maintain aspect ratio
            imgElement.style.marginTop = "10px";
            imageDisplay.appendChild(imgElement);
        } else {
            imageDisplay.innerHTML = '<em>No image received.</em>';
        }

        document.getElementById('userInput').value = ''; // Clear input field
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to bottom
    })
    .catch(error => {
        console.error('Error fetching from chat API:', error);
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error connecting to chat API.';
        chatDisplay.appendChild(errorDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to bottom
    });
});
