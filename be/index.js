require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log("User bertanya:", userMessage);

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        console.log("AI menjawab:", text);
        res.json({ reply: text });

    } catch (error) {
        console.error("Error dari Google:", error.message); 
        
        
        let errorMessage = "Maaf, otak saya sedang gangguan sebentar.";
        
        if (error.message.includes("429") || error.message.includes("Quota")) {
             errorMessage = "Maaf, kuota harian bot sudah habis. Coba lagi besok ya.";
        }
        
        res.status(500).json({ reply: errorMessage });
    }
});

app.listen(port, () => {
    console.log(`Server AI berjalan di http://localhost:${port}`);
});