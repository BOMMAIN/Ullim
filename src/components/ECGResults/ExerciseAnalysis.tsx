import React from 'react';
import styled from 'styled-components';

interface ExerciseMetrics {
  bloodSugar: number;
  bloodPressure: number;
  weight: number;
  bodyWeightKg: number;
}

interface ExerciseAnalysisProps {
  metrics: ExerciseMetrics;
  onRegister: () => void;
}

const ExerciseAnalysis: React.FC<ExerciseAnalysisProps> = ({ metrics, onRegister }) => {
  return (
    <S.Container>
    <S.Content>
      <S.Title>AI 예측 분석</S.Title>
      <S.RecommendationText>
        하루 10분 정도 가벼운 운동을 추천해요
      </S.RecommendationText>
      <S.ComparisonText>
        분석 결과 비슷한 질환을 가진 사용자의 70%가 하고있어요
      </S.ComparisonText>
      <S.MetricsGrid>
        <S.MetricItem>
          <S.MetricLabel>혈당(mg/dL)</S.MetricLabel>
          <S.MetricValue>{metrics.bloodSugar}</S.MetricValue>
        </S.MetricItem>
        <S.MetricItem>
          <S.MetricLabel>혈압(mmHg)</S.MetricLabel>
          <S.MetricValue>{metrics.bloodPressure}</S.MetricValue>
        </S.MetricItem>
        <S.MetricItem>
          <S.MetricLabel>체중<br/>(kg)</S.MetricLabel>
          <S.MetricValue>{metrics.weight}</S.MetricValue>
        </S.MetricItem>
      </S.MetricsGrid>
      <S.EffectText>
        한달간 했을 때 다음과 같은 효과를 얻을 수 있어요.
      </S.EffectText>
      <S.Question>추천을 받아들이겠습니까?</S.Question>
      <S.RegisterButton onClick={onRegister}>
        등록
      </S.RegisterButton>
    </S.Content>
  </S.Container>
  );
};

const S = {

  Container: styled.div`
    display: flex;
    justify-content: center;
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `,
  Content: styled.div`
    width: 100%;
    max-width: 600px;
  `,
  
  Title: styled.h2`
    text-align: center;
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
  `,

  RecommendationText: styled.p`
    font-size: 18px;
    text-align: center;
    margin-bottom: 12px;
  `,

  ComparisonText: styled.p`
    color: #ff6b6b;
    font-size: 14px;
    margin-bottom: 24px;
  `,

 MetricsGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 0 auto;
    margin-bottom: 24px;
    max-width: 500px;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,

  MetricItem: styled.div`
    text-align: center;
  `,

  MetricLabel: styled.div`
    color: #666;
    font-size: 10px;
    margin-bottom: 8px;
  `,

  MetricValue: styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #ff4444;
  `,

  EffectText: styled.p`
    color: #666;
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
  `,

  Question: styled.p`
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  `,

  RegisterButton: styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #4CAF50; /* 식단 추천과 동일한 배경색 */
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #45a049; /* 식단 추천과 동일한 hover 효과 */
    }
  `
};

export default ExerciseAnalysis;
