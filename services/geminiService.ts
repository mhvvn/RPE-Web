import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (history: any[], message: string) => {
  try {
    // Combine history with the new user message for the API call
    const contents = [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: "Anda adalah RPE Bot, asisten virtual cerdas untuk Program Studi Teknologi Rekayasa Pembangkit Energi (RPE) Politeknik Negeri Batam. Tugas anda adalah menjawab pertanyaan mahasiswa dan calon mahasiswa mengenai kurikulum, dosen, fasilitas, berita, dan pendaftaran. Gunakan Bahasa Indonesia yang sopan, formal namun ramah. Jika informasi tidak tersedia, sarankan untuk menghubungi kontak prodi.",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, saat ini layanan AI sedang sibuk. Mohon coba beberapa saat lagi.";
  }
};