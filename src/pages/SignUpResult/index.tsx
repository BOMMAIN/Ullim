import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { analyzeEcgAndReport } from "./analyzeEcgAndReport";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ecgImage, diagnosisImage } = location.state || {};
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const analyzeImages = async () => {
      if (!ecgImage || !diagnosisImage) {
        alert("이미지가 없습니다. 다시 업로드해주세요.");
        navigate("/");
        return;
      }
      setLoading(true);
      try {
        const result = await analyzeEcgAndReport(ecgImage, diagnosisImage);
        setAnalysisResult(result);
      } catch (error) {
        console.error("분석 중 오류 발생:", error);
        alert("분석 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    analyzeImages();
  }, [ecgImage, diagnosisImage]);

  return (
    <div>
      <h1>분석 결과</h1>
      {loading && <p>분석 중입니다...</p>}
      {analysisResult && (
        <>
          <h3>심전도 분석</h3>
          <p>{analysisResult.ecgAnalysis}</p>
          <h3>진단서 분석</h3>
          <pre>{JSON.stringify(analysisResult.reportAnalysis, null, 2)}</pre>
          <h3>종합 결과</h3>
          <p>{analysisResult.summary}</p>
        </>
      )}
    </div>
  );
};

export default ResultPage;
