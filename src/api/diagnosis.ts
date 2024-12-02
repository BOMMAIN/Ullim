import OpenAI from 'openai';
import { DiagnosisData } from '../types/diagnosis';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const analyzeImage = async (file: File) => {
    const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
    // 파일을 base64로 변환
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  
    const requestBody = {
      requests: [{
        image: {
          content: base64Image.split(',')[1]
        },
        features: [{
          type: "TEXT_DETECTION"
        }]
      }]
    };
  
    const response = await fetch(visionApiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
  
    const result = await response.json();
    return result.responses[0]?.textAnnotations[0]?.description || '';
  };

export const parseTextToData = async (text: string): Promise<DiagnosisData> => {
    try {
      const data = await parseDiagnosisText(text);
      return data;
    } catch (error) {
      console.error('GPT API error:', error);
      throw error;
    }
  };

export const parseDiagnosisText = async (text: string): Promise<DiagnosisData> => {
  const prompt = `다음 진단서 텍스트를 분석하여 JSON 형식으로 반환해주세요:
${text}

다음 형식으로 반환해주세요:
{
  "mainDisease": "주 진단명",
  "subDisease": "부 진단명 (있는 경우)",
  "treatment": "치료 내용",
  "opinion": "소견(특별한 내용이 없으면 없다고 표시)",
  "diagnosisDate": "진단일",
  "summary": ["사용자가 이해하기 쉽게 진단에 대해 풀이한 내용을 3-4개의 문장으로 작성해주세요. 소견이 자세히 나타나있다면 소견에 대해 풀이해주세요. 사용자의 개인 정보(거주지 등)은 설명할 필요 없습니다.  ex: ["심초음파 결과, 박출률이 약간 감소한 상태(47-48%)로, 심장의 점핑 능력이 다소 저하되어 심장 전문의의 추가 모니터링과 평가가 필요할 수 있어요.",

  "좌심실, 좌심방, 심장 벽 두께를 포함한 심장 구조는 정상 범위 내에 있어, 확장이나 비정상적인 두꺼워짐이 없음을 시사해요.",
  
  "심장 판막을 통한 혈류와 폐동맥 압력은 대부분 정상으로, 박출률이 감소했음에도 불구하고 적절한 순환을 나타내요."] "]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error) {
    console.error('GPT parsing error:', error);
    throw error;
  }
};