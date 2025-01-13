import { useEffect, useState } from "react";
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
        console.log("종합 의견:", result);
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
                {typeof analysisResult.ecgAnalysis === "object" ? (
                  <>
                    <p>
                      <strong>심박수:</strong>{" "}
                      {analysisResult.ecgAnalysis.heartRate}
                    </p>
                    <p>
                      <strong>비정상 박동 수:</strong>{" "}
                      {analysisResult.ecgAnalysis.abnormalBeats}
                    </p>
                    <p>
                      <strong>해석:</strong>{" "}
                      {analysisResult.ecgAnalysis.interpretation}
                    </p>
                  </>
                ) : (
                  <PreformattedText>
                    {JSON.stringify(analysisResult.ecgAnalysis, null, 2)}
                  </PreformattedText>
                )}
              </CardContent>
            </Card>

            {/* 진단서 분석 결과 카드 */}
            <Card>
              <CardTitle>📄 진단서 분석</CardTitle>
              <CardContent>
                <PreformattedText>
                  {analysisResult.reportAnalysis.summary.map(
                    (result: string, index: number) => (
                      <div>
                        ✅ {result}
                        <br /> {/* ✅ 줄바꿈 추가 */}
                      </div>
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
  max-width: 600px; /* ✅ 모든 카드의 최대 크기를 동일하게 설정 */
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
  align-items: center; /* ✅ 모든 카드 크기를 중앙 정렬로 고정 */
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  overflow-x: hidden;
  width: 100%; /* ✅ 카드의 너비를 100%로 고정 */
  max-width: 500px; /* ✅ 최대 크기 제한 */
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
