// translate.ts 파일에서 함수 정의 (변경 없음)
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const translateToKorean = async (text: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Translate the following text to Korean:" },
        { role: "user", content: text },
      ],
    });

    return response.choices[0].message?.content || "번역 실패";
  } catch (error) {
    console.error("번역 중 오류 발생:", error);
    return "번역 오류";
  }
};
