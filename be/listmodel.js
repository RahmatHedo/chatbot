require('dotenv').config();

const apiKey = process.env.API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🔍 Sedang mengecek daftar model yang tersedia untuk API Key kamu...");

async function checkModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("❌ ERROR DARI GOOGLE:", data.error.message);
        } else if (data.models) {
            console.log("✅ SUKSES! Berikut model yang BISA kamu pakai:");
            console.log("------------------------------------------------");
            // Filter hanya model yang support 'generateContent'
            const availableModels = data.models
                .filter(m => m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name.replace("models/", "")); 
            
            console.log(availableModels.join("\n"));
            console.log("------------------------------------------------");
            console.log("SARAN: Pilih salah satu nama di atas untuk ditaruh di server.js");
        } else {
            console.log("⚠️ Tidak ada model yang ditemukan. Mungkin API Key belum aktif?");
        }
    } catch (error) {
        console.error("❌ Gagal menghubungi server:", error.message);
    }
}

checkModels();