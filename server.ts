import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { LAPTOP_DATABASE } from "./src/data/laptops";

// Load environment variables
dotenv.config();

// Lazy-initialized Gemini API client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Please add it in Settings > Secrets in the Google AI Studio UI.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Midldleware for JSON and Forms
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route: Get all laptops
  app.get("/api/laptops", (req, res) => {
    try {
      res.json(LAPTOP_DATABASE);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Route: Gemini Smart AI Recommendation
  app.post("/api/gemini/recommend", async (req, res) => {
    try {
      const { needs = [], budget = 0, additionalInfo = "" } = req.body;

      if (!needs || needs.length === 0) {
        return res.status(400).json({ error: "Sebutkan minimal satu kebutuhan laptop Anda." });
      }

      // Initialize Gemini Client
      const ai = getAiClient();

      // Format laptop data context for AI to make suggestions strictly from existing laptops
      const laptopContext = LAPTOP_DATABASE.map(laptop => ({
        id: laptop.id,
        name: laptop.name,
        brand: laptop.brand,
        price: laptop.price,
        processor: laptop.processor,
        gpu: laptop.gpu,
        ram: laptop.ram,
        storage: laptop.storage,
        category: laptop.category,
        bestFor: laptop.bestFor,
        display: laptop.display,
        weight: laptop.weight
      }));

      const systemInstruction = `Anda adalah konsultan ahli spesifikasi laptop senior tahun 2026.
Tugas Anda adalah membaca preferensi kebutuhan pengguna (misal: Gaming, Kuliah, Programming) dan anggaran maksimal budget (dalam Rupiah), lalu merekomendasikan laptop terbaik yang TERSEDIA DI DATABASE KAMI.

Ingat hal-hal krusial berikut:
1. Rekomendasi Anda harus HANYA memilih laptop dari database yang kami berikan. Jangan buat-buat laptop atau id lain dari luar database.
2. Filter anggaran: Utamakan laptop yang harganya DI BAWAH atau SANGAT DEKAT dengan anggaran pengguna. Jika anggaran terlalu rendah untuk kategori tertentu, jelaskan dengan ramah dan tawarkan opsi termurah yang masuk akal dari database.
3. Berbahasa Indonesia yang sopan, meyakinkan, profesional, dan mudah dipahami oleh pembeli umum.
4. Sesuaikan argumen kecocokan laptop dengan spesifikasi yang ia miliki (seperti kelebihan RAM, keringanan berat, kekuatan GPU, atau masa baterai).

Database Laptop yang tersedia:
${JSON.stringify(laptopContext, null, 2)}
`;

      const promptMsg = `Saya membutuhkan rekomendasi laptop berdasarkan kriteria berikut:
Kebutuhan utama: ${needs.join(", ")}
Anggaran maksimal: Rp ${budget.toLocaleString("id-ID")}
Catatan tambahan dari saya: ${additionalInfo || "Tidak ada catatan tambahan."}

Berikan analisis Anda, pilihlah laptop yang paling cocok dari database, dan berikan tips pembelian terbaik bagi saya dalam format JSON yang ditentukan.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptMsg,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.7,
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: "Penjelasan mendalam dan persuasif tentang kebutuhan pengguna dan bagaimana tipe laptop tertentu memenuhi kebutuhan tersebut."
              },
              recommendations: {
                type: Type.ARRAY,
                description: "Daftar laptop yang direkomendasikan secara berurutan berdasarkan yang paling cocok.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    laptopId: {
                      type: Type.STRING,
                      description: "ID laptop yang direkomendasikan. Harus persis sama dengan salah satu ID dari database laptop yang diberikan (misal: 'asus-rog-zephyrus-g14')."
                    },
                    reason: {
                      type: Type.STRING,
                      description: "Alasan spesifik mengapa laptop ini cocok untuk kebutuhan dan budget mereka. Rujuk spesifikasi konkretnya (misal: RAM, GPU, berat, baterai)."
                    }
                  },
                  required: ["laptopId", "reason"]
                }
              },
              advice: {
                type: Type.STRING,
                description: "Tips tambahan dalam memilih atau merawat laptop khusus untuk kebutuhan pengguna tersebut."
              }
            },
            required: ["summary", "recommendations", "advice"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Gagal menerima respons teks dari model AI.");
      }

      const recommendationData = JSON.parse(responseText.trim());
      res.json(recommendationData);
    } catch (error: any) {
      console.error("AI Recommendation Error:", error);
      res.status(500).json({ error: error.message || "Terjadi kesalahan internal saat memproses rekomendasi AI." });
    }
  });

  // Handle static assets or Vite middleware depending on the environment
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode with compiled assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal Server Startup Error:", err);
  process.exit(1);
});
