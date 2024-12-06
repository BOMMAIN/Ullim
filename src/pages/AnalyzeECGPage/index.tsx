import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ChatService } from '../../api/chatServices';
import { v4 as uuidv4 } from 'uuid';
import type { ECGAnalysisResponse, ECGDetailedAnalysis } from '../../types/ecg';

// Keyframes for left-to-right scan animation
const scan = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

// Styled components
const AnalyzeContainer = styled.div`
  margin-bottom: 24px;
  width: 384px;
  margin-left: auto;
  margin-right: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const ECGDisplay = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden; /* Ensure the scan animation stays within the container */
`;

const ECGImage = styled.img`
  height: 324px;
  width: 100%;
  border-radius: 8px;
`;

const ScanOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20%;
  background: rgba(74, 144, 226, 0.2); /* Semi-transparent blue */
  animation: ${scan} 10s linear infinite;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #FFFFFF;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #E87C6C;
  transition: width 0.2s ease-in-out;
`;

const LoadingText = styled.p`
  color: #6b7280; /* Gray-500 */
  font-size: 14px;
`;

const AnalyzeECGPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const chatService = new ChatService();
  const { file, isFromSignup, signupData } = location.state || {};
  const sessionId = useRef(uuidv4()).current;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const duration = 10000;

    const analyzeECG = async () => {
      try {
        // 현재 어떤 데이터가 전송되는지 확인
        console.log("Sending file:", file);
        
        const formData = new FormData();
        formData.append('ecg_file', file);
    
        formData.forEach((value, key) => {
          console.log(key, value);
        });

    
        const response = await fetch('http://127.0.0.1:8000/upload', {
          method: 'POST',
          body: formData
        });
    
        if (!response.ok) {
          // 에러 응답의 자세한 내용 확인
          const errorText = await response.text();
          console.error('Server error response:', errorText);
          throw new Error('ECG 분석 실패');
        }
        
        const aiResult: ECGAnalysisResponse = await response.json();

        const prompt = `당신은 심장 전문의입니다. 다음 AI가 진단한 심전도 결과를 자세히, 환자가 이해하기 쉽게 분석해주세요:
        진단 결과: ${JSON.stringify(aiResult.results)}
        
        응답은 반드시 다음 JSON 형식으로 작성해주세요:
        {
          "analysis": {
            "summary": "전반적인 심전도 상태에 대한 요약",
            "mainFindings": "주요 발견사항 설명",
            "implications": [
              "이 진단이 의미하는 바 1",
              "이 진단이 의미하는 바 2",
              "이 진단이 의미하는 바 3"
            ],
            "recommendations": [
              "환자를 위한 권장사항 1",
              "환자를 위한 권장사항 2"
            ],
            "diagnoses": [
              "한글로 번역된 진단명 1",
              "한글로 번역된 진단명 2"
            ]
          }
        }`;

        const gptResponse = await chatService.chat(
          'temp-user-id',
          'analysis',
          prompt
        );

        const analysisResult: ECGDetailedAnalysis = JSON.parse(gptResponse);

        navigate('/analyze-result-page', {
          state: {
            aiResults: aiResult.results,
            analysisResult,
            isFromSignup,
            signupData: {
              ...signupData,
              ecgFile: file,  // 원본 파일 추가
            }
          }
        });

      } catch (error) {
        console.error('분석 중 오류 발생:', error);
      }
    };

    intervalId = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (duration / 100)), 100));
    }, 100);

    analyzeECG();

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate, file, isFromSignup, signupData]);

  return (
    <AnalyzeContainer>
      <MainContent>
        <Title>심전도를 분석하는 중입니다...</Title>
        <ECGDisplay>
          <ECGImage src="/images/ECG_example.png" alt="ECG Scan" />
          <ScanOverlay />
        </ECGDisplay>
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
        <LoadingText>분석이 완료될 때까지 잠시만 기다려주세요!</LoadingText>
      </MainContent>
    </AnalyzeContainer>
  );
};

export default AnalyzeECGPage;
