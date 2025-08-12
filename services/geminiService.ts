
import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const NEWS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    articles: {
      type: Type.ARRAY,
      description: "Uma lista de 3 artigos de notícias.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: {
            type: Type.STRING,
            description: "A categoria da notícia, ex: 'Preços dos Combustíveis', 'Veículos Elétricos', 'Política Governamental'.",
          },
          title: {
            type: Type.STRING,
            description: "O título do artigo.",
          },
          summary: {
            type: Type.STRING,
            description: "Um resumo curto do artigo, cerca de 1-2 frases.",
          },
          imageUrl: {
            type: Type.STRING,
            description: "Um URL para uma imagem relevante. Use uma semente única de picsum.photos, ex: https://picsum.photos/seed/news1/400/200",
          },
        },
        required: ["category", "title", "summary", "imageUrl"],
      },
    },
  },
  required: ["articles"],
};

export const fetchLatestNews = async (): Promise<NewsArticle[]> => {
  try {
    const prompt = `
      Gere 3 artigos de notícias recentes, realistas mas fictícios, relacionados com os preços dos combustíveis, veículos elétricos e políticas governamentais em Portugal.
      Forneça a saída em formato JSON válido de acordo com o esquema fornecido.
      Use títulos e resumos variados e realistas.
      Para URLs de imagem, use https://picsum.photos/seed/news1/400/225, https://picsum.photos/seed/news2/400/225, e https://picsum.photos/seed/news3/400/225 respetivamente.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: NEWS_SCHEMA,
        },
    });

    const jsonStr = response.text.trim();
    const parsed = JSON.parse(jsonStr);
    return parsed.articles || [];

  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    // Return a fallback array in case of an error
    return [
        {
            category: "Erro de API",
            title: "Não foi possível carregar as notícias",
            summary: "Ocorreu um problema ao buscar as últimas notícias. Por favor, verifique a consola para mais detalhes.",
            imageUrl: "https://picsum.photos/seed/error/400/225"
        }
    ];
  }
};
