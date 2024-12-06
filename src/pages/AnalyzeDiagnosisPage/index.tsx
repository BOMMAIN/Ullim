import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { analyzeImage } from '../../api/vision';
import { parseDiagnosisText } from '../../api/diagnosis';


// 애니메이션 정의
const scan = keyframes`
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(100%);
  }
`;

// 스타일 컴포넌트 정의
const Container = styled.div`
  margin-bottom: 1.5rem;
  width: 24rem;
  margin-left: auto;
  margin-right: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
`;

const DiagnosisImageContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const DiagnosisImageWrapper = styled.div`
  position: relative;
  height: 24rem;
  overflow: hidden;
  border-radius: 0.5rem;
`;

const DiagnosisImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
`;

const ScanningAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* 전체 이미지를 커버하도록 수정 */
  background: linear-gradient(
    rgba(59, 130, 246, 0.2),
    rgba(59, 130, 246, 0.8),
    rgba(59, 130, 246, 0.2)
  ); /* 스캐너가 전체 범위를 덮도록 그라데이션 적용 */
  animation: ${scan} 2s linear infinite;
  opacity: 0.7;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #FFFFFF;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: #E87C6C;
  transition: width 0.5s ease;
`;

const LoadingText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const AnalyzeDiagnosisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;
  const [progress, setProgress] = useState(0);

  console.log("AnalyzeDiagnosis state:", location.state); // 디버깅용

  const { 
    isFromSignup, 
    signupData 
  } = location.state || {};


  useEffect(() => {
    let isNavigating = false;
    let isMounted = true;

    const analyzeData = async () => {
      try {
        for (let i = 1; i <= 100; i++) {
          if (!isMounted) break;
          setProgress(i);
          await new Promise((resolve) => setTimeout(resolve, 50)); // 5초 동안 진행
        }

        const extractedText = await analyzeImage(imageUrl);
        const data = await parseDiagnosisText(extractedText);

        if (isMounted && !isNavigating) {
          console.log("Navigating with state:", { 
            imageUrl, 
            data,
            isFromSignup,  // 이 값이 제대로 전달되는지 확인
            signupData 
          });

          navigate('/medical-report', { 
            state: { 
              imageUrl, 
              data,
              isFromSignup,  // 이 값을 확실히 전달
              signupData: {
                ...signupData,
                diagnosisImageUrl: imageUrl  // 이미지 URL 추가해서 전달
              }
            } 
          });
        }
      } catch (error) {
        if (isMounted && !isNavigating) {
          isNavigating = true;
          alert('글자를 인식하지 못했습니다');
          navigate(-1);
        }
      }
    };

    if (imageUrl) {
      analyzeData();
    }

    return () => {
      isMounted = false;
    };
  }, [imageUrl, navigate, isFromSignup, signupData]);

  return (
    <Container>
      <Content>
        <Title>진단서를 분석하는 중입니다...</Title>
        <DiagnosisImageContainer>
          <DiagnosisImageWrapper>
            <DiagnosisImage src={imageUrl} alt="진단서" />
            <ScanningAnimation />
          </DiagnosisImageWrapper>
        </DiagnosisImageContainer>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <LoadingText>거의 다 됐어요!</LoadingText>
      </Content>
    </Container>
  );
};

export default AnalyzeDiagnosisPage;
