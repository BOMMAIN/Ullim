import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { ChatHistory, ChatMessage, ECGData } from '../types/chat';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const tempECGData: ECGData = {
  pd: 110,
  pr: 160,
  qt: 380,
  qtc: 450,
  stSegment: "수평 또는 하향 경사진 ST 분절 하강"
};

export class ChatService {
    private histories: Map<string, ChatHistory> = new Map();

    private initHistory(userId: string): ChatHistory {
      return {
        userId,
        messages: {
          analysis: [],
          medical: [],
          lifestyle: []
        }
      };
    }


    async chat(userId: string, type: 'analysis'|'medical'|'lifestyle', userMessage: string) {
      let history = this.histories.get(userId) || this.initHistory(userId);
      let prompt = '';
  
      if (userMessage.includes('운동 추천')) {
        prompt = `당신은 운동 전문가입니다. 다음 심전도 결과를 바탕으로 운동 추천을 해주세요: ${JSON.stringify(tempECGData)}
        응답은 반드시 다음 JSON 형식으로 제공해주세요:
        {
          "type": "exercise",
          "content": "운동 추천 설명",
          "exercises": [
            {
              "name": "운동명",
              "intensity": "강도(상/중/하)",
              "duration": "시간(분)",
              "repetitions": "횟수",
              "frequency": "주 횟수",
              "period": "추천 기간(주)",
              "caution": "주의사항"
            }
          ],
          "metrics": {
            "bloodSugar": -3,
            "bloodPressure": -5,
            "weight": -3,
            "bodyWeightKg": -2
          }
        }`;
      } else if (userMessage.includes('식단 추천')) {
        prompt = `당신은 영양 전문가입니다 다음 심전도 결과를 바탕으로 식단 추천을 해주세요: ${JSON.stringify(tempECGData)}. 아래 형식의 JSON만 반환하세요. 다른 설명이나 조언은 하지 마세요.
        JSON 응답 형식:
        {
          "type": "diet",
          "recommendations": [
            {
              "food": "구체적인 음식명",
              "reason": "해당 음식을 추천하는 구체적인 이유",
              "nutrients": [
                {
                  "name": "영양소명",
                  "benefit": "해당 영양소의 구체적인 효과"
                }
              ]
            }
          ],
          "nutritionGuidelines": {
            "increase": ["증가시킬 영양소 목록"],
            "decrease": ["감소시킬 영양소 목록"]
          }
        }
        위 형식 외의 다른 필드(advice 등)는 포함하지 마세요.`;
      } else {
        prompt = this.getSystemPrompt(type, history.ecgData);
      }
  
      try {
        const messages: ChatCompletionMessageParam[] = [
          { role: 'system', content: prompt },
          ...history.messages[type].map(msg => ({
            role: msg.role as 'system' | 'user' | 'assistant',
            content: msg.content
          })),
          { role: 'user', content: userMessage }
        ];
  
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages,
          response_format: { type: "json_object" },
          temperature: 0.1
        });
  
        const response = chatCompletion.choices[0].message.content;
        if (response) {
          history.messages[type].push({
            role: 'assistant',
            content: response
          });
          this.histories.set(userId, history);
        }
  
        return response || '';
      } catch (error) {
        console.error('Chat error:', error);
        throw error;
      }
    }

  private getSystemPrompt(type: 'analysis'|'medical'|'lifestyle', ecgData?: ECGData): string {
    const prompts = {
      analysis: `JSON 형식으로 응답해주세요. 당신은 심전도 분석 전문가입니다. 다음 데이터를 바탕으로 분석해주세요: ${JSON.stringify(tempECGData)}`,
      medical: `당신은 심장 질환 전문의입니다.  다음 데이터를 바탕으로 분석해주세요:${JSON.stringify(tempECGData)}. JSON 형식으로 다음 구조에 맞춰 답변해주세요:
      {
        "answer": "질문에 대한 대답"
      }`,
      lifestyle: `JSON 형식으로 응답해주세요. 다음 심전도 결과를 바탕으로 생활습관 개선점을 조언해주세요: ${JSON.stringify(tempECGData)}`
    };
    return prompts[type];
  }
}