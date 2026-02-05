
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Gemini API Key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export interface AnalysisResult {
  plantName: string;
  diagnosis: string;
  confidence: number;
  treatment: string[];
  fertilizer: string[];
}

export async function analyzePlantImage(base64Image: string): Promise<AnalysisResult> {
  // Remove header if present (e.g. data:image/jpeg;base64,)
  const base64Data = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

  const prompt = `
  Sen uzman bir ziraat mühendisi ve yapay zeka asistanısın. Bu bitki resmini analiz et.
  
  Lütfen şu formatta JSON döndür (başka metin ekleme):
  {
    "plantName": "Bitki Adı",
    "diagnosis": "Hastalık veya Zararlı Adı (Sağlıklı ise 'Sağlıklı' yaz)",
    "confidence": 0 ile 100 arası sayı,
    "treatment": ["İlaç 1 (Varsa DOZAJ belirt: örn 100L suya 50gr)", "Kültürel önlem 2"],
    "fertilizer": ["Gübre Önerisi (DOZAJ ve uygulama yöntemi ile)"]
  }
  
  Eğer resimde bitki yoksa veya net değilse, hata mesajı içeren bir JSON döndür.
  `;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const text = result.response.text();
    // Clean markdown code blocks if present
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleanText) as AnalysisResult;
  } catch (error: any) {
    const keyStatus = apiKey ? `Mevcut (Uzunluk: ${apiKey.length})` : "EKSİK";
    console.error("Gemini Analysis Error:", error);
    console.error("API Key Status:", keyStatus);
    throw new Error(`Analiz hatası: ${error.message || error} (API Key: ${keyStatus})`);
  }
}
