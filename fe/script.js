/* --- LOGIC CHATBOT (ASLI & AMAN) --- */

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    // Logika display flex/none
    if (chatContainer.style.display === 'flex') {
        chatContainer.style.display = 'none';
    } else {
        chatContainer.style.display = 'flex';
        // Auto focus ke input saat dibuka
        setTimeout(() => document.getElementById('userInput').focus(), 100);
    }
}

function handleEnter(event) {
    if (event.key === 'Enter') sendMessage();
}

// --- FUNGSI UTAMA (KONEKSI KE BACKEND) ---
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const messageText = inputField.value.trim();

    if (messageText === "") return;

    // 1. Tampilkan pesan User
    addMessage(messageText, 'user-message');
    inputField.value = ''; 

    // 2. TAMPILKAN INDIKATOR "MENGETIK..."
    const loadingBubble = showTypingIndicator();

    try {
        // 3. Kirim ke Backend (Fetch) - LOGIKA TIDAK DIUBAH
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });

        if (!response.ok) throw new Error('Gagal menghubungi server');

        const data = await response.json();

        // 4. Hapus indikator loading
        if (loadingBubble) loadingBubble.remove();
        
        // 5. Tampilkan balasan AI
        addMessage(data.reply, 'bot-message');

    } catch (error) {
        console.error("Error:", error);
        if (loadingBubble) loadingBubble.remove();
        addMessage("Maaf, terjadi gangguan koneksi ke server.", 'bot-message');
    }
}

// Helper: Menampilkan pesan
function addMessage(text, className) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    // Parsing Markdown sederhana (Bold & Newline)
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formattedText = formattedText.replace(/\n/g, '<br>');

    messageDiv.classList.add('message', className);
    messageDiv.innerHTML = formattedText;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll ke bawah
}

// Helper: Animasi mengetik
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    
    typingDiv.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typingDiv;
}