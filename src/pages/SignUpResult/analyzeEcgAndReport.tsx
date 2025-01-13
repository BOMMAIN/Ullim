import { detectTextFromImage } from "@api/vision";
import { parseDiagnosisText } from "@api/diagnosis";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // 브라우저 환경에서 사용 주의
});

export const analyzeEcgAndReport = async (ecgFile: File, reportFile: File) => {
  if (!ecgFile || !reportFile) {
    throw new Error("심전도와 진단서 파일을 모두 제공해야 합니다.");
  }

  try {
    // ✅ 심전도 데이터 서버로 전송 (서버 분석 결과 수집)
    const ecgFormData = new FormData();
    ecgFormData.append("ecg_file", ecgFile);

    console.log("심전도 데이터 서버로 전송 중...");

    const ecgResponse = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: ecgFormData,
    });

    if (!ecgResponse.ok) {
      const errorText = await ecgResponse.text();
      throw new Error(`ECG 분석 오류: ${errorText}`);
    }

    const ecgAnalysisResult = await ecgResponse.json();

    // ✅ 진단서 이미지는 Vision API를 통해 분석
    const reportText = await detectTextFromImage(reportFile);
    const reportAnalysisResult = await parseDiagnosisText(reportText);

    // ✅ GPT에게 summary 생성 요청
    const prompt = `
    심전도 분석 결과와 진단서 분석 결과를 기반으로 환자의 건강 상태를 종합적으로 평가해주세요.

    심전도 분석 결과: ${JSON.stringify(ecgAnalysisResult.results)}
    진단서 분석 결과: ${JSON.stringify(reportAnalysisResult)}

    결과를 사용자가 이해하기 쉽게 한글로 작성해 주세요.
    `;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "당신은 의학 전문가입니다." },
        { role: "user", content: prompt },
      ],
    });

    const generatedSummary =
      gptResponse.choices[0]?.message?.content || "요약 생성 실패";

    // ✅ 통합 결과 생성
    const combinedResult = {
      ecgAnalysis: ecgAnalysisResult,
      reportAnalysis: reportAnalysisResult,
      summary: generatedSummary,
    };

    return combinedResult;
  } catch (error) {
    console.error("Error analyzing ECG and Report:", error);
    throw new Error("의료 이미지 분석 중 오류가 발생했습니다.");
  }
};
