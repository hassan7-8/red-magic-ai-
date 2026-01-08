import { GoogleGenAI, Type } from "@google/genai";
import { MODES } from "../constants";
import { AICapability } from "../types";

// Helper to convert base64
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateResponse = async (
  modeId: string,
  prompt: string,
  imageFile?: File
): Promise<{ text: string; image?: string }> => {
  if (!process.env.API_KEY) {
    return { text: "Error: API_KEY is missing from environment variables." };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const mode = MODES.find((m) => m.id === modeId) || MODES[0];

  try {
    // IMAGE GENERATION MODE
    if (mode.capability === AICapability.IMAGE_GENERATION) {
       // Using gemini-2.5-flash-image for generation via generateContent as per guidelines for nano/banana models
       // Or usually generateImages is preferred for Imagen, but prompt says "nano banana" maps to gemini-2.5-flash-image
       // Guidelines: "Call generateContent to generate images with nano banana series models"
       const response = await ai.models.generateContent({
        model: mode.model,
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          // Guidelines: DO NOT set responseMimeType for nano banana
          // Just ask for image in text
        }
      });
      
      let generatedImage = '';
      let generatedText = '';

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
             generatedImage = `data:image/png;base64,${part.inlineData.data}`;
          } else if (part.text) {
             generatedText += part.text;
          }
        }
      }
      
      return { 
        text: generatedText || "Generating image visualization...", 
        image: generatedImage 
      };
    }

    // MULTIMODAL (Vision)
    if (mode.capability === AICapability.MULTIMODAL && imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      const response = await ai.models.generateContent({
        model: mode.model,
        contents: {
          parts: [imagePart, { text: prompt }]
        },
        config: {
          systemInstruction: mode.systemInstruction
        }
      });
      return { text: response.text || "No analysis provided." };
    }

    // STANDARD TEXT / DEEP THINKING / SEARCH
    let config: any = {
      systemInstruction: mode.systemInstruction
    };

    if (mode.capability === AICapability.DEEP_THINKING) {
      // Enable thinking for Pro models (Gaming/Strategy)
      // Guidelines: "Set both maxOutputTokens and thinkingConfig.thinkingBudget at the same time."
      config = {
        ...config,
        maxOutputTokens: 2048, 
        thinkingConfig: { thinkingBudget: 1024 } 
      };
    } else if (mode.capability === AICapability.SEARCH) {
        config = {
            ...config,
            tools: [{ googleSearch: {} }]
        };
    }

    const response = await ai.models.generateContent({
      model: mode.model,
      contents: prompt,
      config: config
    });

    // Check for grounding (search results)
    let groundingText = "";
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
       const chunks = response.candidates[0].groundingMetadata.groundingChunks;
       const urls = chunks
        .filter((c: any) => c.web?.uri)
        .map((c: any) => `[${c.web.title}](${c.web.uri})`)
        .join('\n');
       if (urls) {
         groundingText = `\n\n**Sources:**\n${urls}`;
       }
    }

    return { text: (response.text || "") + groundingText };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "System Malfunction. connection_interrupted. Try again." };
  }
};
