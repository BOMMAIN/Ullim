import { detectTextFromImage } from "@api/vision";
import { parseDiagnosisText } from "@api/diagnosis";

// 심전도와 진단서 파일을 처리하고 결과를 통합
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
    console.log("테스트: ", ecgAnalysisResult);

    const combinedResult = {
      ecgAnalysis: ecgAnalysisResult,
      reportAnalysis: reportAnalysisResult,
      summary: `심전도 분석과 진단서를 기반으로 건강 상태를 종합적으로 평가했습니다.`,
    };

    return combinedResult;
  } catch (error) {
    console.error("Error analyzing ECG and Report:", error);
    throw new Error("의료 이미지 분석 중 오류가 발생했습니다.");
  }
};
