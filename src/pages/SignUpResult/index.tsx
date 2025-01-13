import { translateToKorean } from "./translate";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { analyzeEcgAndReport } from "./analyzeEcgAndReport";
import { IoIosClose } from "react-icons/io";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ecgImage, diagnosisImage } = location.state || {};
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [translatedResults, setTranslatedResults] = useState<string[]>([]);

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

        // ✅ 번역 후 바로 사용
        const translations = await Promise.all(
          result.ecgAnalysis.results.map((item: string) =>
            translateToKorean(item)
          )
        );
        setTranslatedResults(translations);
      } catch (error) {
        console.error("분석 중 오류 발생:", error);
        alert("분석 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    analyzeImages();
  }, [ecgImage, diagnosisImage, navigate]);

  const handleClose = () => {
    navigate("/community");
  };

  return (
    <>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <CloseButton onClick={handleClose}>
          <IoIosClose size={40} />
        </CloseButton>
      </div>
      <Container>
        <Title>📊 심전도 및 진단서 분석 결과</Title>

        {loading && (
          <LoadingText>🌀 분석 중입니다... 잠시만 기다려주세요!</LoadingText>
        )}

        {analysisResult && (
          <ResultContainer>
            {/* 심전도 분석 결과 카드 */}
            <Card>
              <CardTitle>🩺 심전도 분석</CardTitle>
              <CardContent>
                <ul>
                  {translatedResults.length > 0
                    ? translatedResults.map((translation, index) => (
                        <li key={index}>✅ {translation}</li>
                      ))
                    : analysisResult.ecgAnalysis.results.map(
                        (result: string, index: number) => (
                          <li key={index}>🟡 {result}</li>
                        )
                      )}
                </ul>
              </CardContent>
            </Card>

            {/* 진단서 분석 결과 카드 */}
            <Card>
              <CardTitle>📄 진단서 분석</CardTitle>
              <CardContent>
                <PreformattedText>
                  {analysisResult.reportAnalysis.summary.map(
                    (result: string, index: number) => (
                      <div key={index}>✅ {result}</div>
                    )
                  )}
                </PreformattedText>
              </CardContent>
            </Card>

            {/* 종합 결과 카드 */}
            <SummaryCard>
              <CardTitle>📈 종합 결과</CardTitle>
              <SummaryText>{analysisResult.summary}</SummaryText>
            </SummaryCard>
          </ResultContainer>
        )}
      </Container>
    </>
  );
};

export default ResultPage;

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto 50px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #007bff;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  overflow-x: hidden;
  width: 100%;
  max-width: 500px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #444;
  text-align: left;
`;

const CardContent = styled.div`
  font-size: 1rem;
  color: #555;
  text-align: left;
`;

const PreformattedText = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: hidden;
`;

const SummaryCard = styled(Card)`
  background: #ffebcd;
`;

const SummaryText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: left;
`;

const CloseButton = styled.button`
  padding: 2px 7px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #c0392b;
  }
`;
