import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const duration = 10000; // Total time in ms (10 seconds)

    // Increment progress bar every 100ms
    intervalId = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (duration / 100)), 100));
    }, 100);

    // Navigate to result page after 10 seconds
    const timer = setTimeout(() => {
      clearInterval(intervalId);
      navigate('/analyze-result-page'); // Replace with the actual result page route
    }, duration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <AnalyzeContainer>
      {/* Main Content */}
      <MainContent>
        <Title>심전도를 분석하는 중입니다...</Title>

        {/* ECG Display */}
        <ECGDisplay>
          <ECGImage src="/images/ECG_example.png" alt="ECG Scan" />
          <ScanOverlay />
        </ECGDisplay>

        {/* Progress Bar */}
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>

        {/* Loading Text */}
        <LoadingText>분석이 완료될 때까지 잠시만 기다려주세요!</LoadingText>
      </MainContent>
    </AnalyzeContainer>
  );
};

export default AnalyzeECGPage;
