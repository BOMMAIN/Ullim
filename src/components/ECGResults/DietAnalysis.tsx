import React, { useState } from 'react';
import styled from 'styled-components';

interface AnalysisResult {
  recommendation: string;
  description: string;
  increase: string[];
  decrease: string[];
}

interface DietAnalysisProps {
  recommendations: Array<{
    food: string;
    reason: string;
    nutrients: Array<{name: string; benefit: string}>;
  }>;
  nutritionGuidelines: {
    increase: string[];
    decrease: string[];
  };
  onRegister: () => void;
}

const DietAnalysis: React.FC<DietAnalysisProps> = ({ 
  recommendations = [], 
  nutritionGuidelines = { increase: [], decrease: [] }, 
  onRegister 
}) => {
  if (!recommendations.length) return null;
 
  return (
    <S.Container>
      <S.Title>AI 예측 분석</S.Title>
      
      <S.RecommendationSection>
        <S.RecommendationTitle>
          {recommendations[0].food}을 추천해드려요
        </S.RecommendationTitle>
        <S.Description>{recommendations[0].reason}</S.Description>
      </S.RecommendationSection>

      <S.GuidelinesSection>
        <S.GuidelineBox>
          <S.GuidelineContent>
            <S.GuidelineTitle>늘렸어요</S.GuidelineTitle>
            <S.Arrow $direction="up">↑</S.Arrow>
            <S.NutrientList>
              {nutritionGuidelines.increase.map((nutrient, index) => (
                <S.NutrientTag key={index} $increase>{nutrient}</S.NutrientTag>
              ))}
            </S.NutrientList>
          </S.GuidelineContent>
        </S.GuidelineBox>
        
        <S.GuidelineBox>
          <S.GuidelineContent>
            <S.GuidelineTitle>줄였어요</S.GuidelineTitle>
            <S.Arrow $direction="down">↓</S.Arrow>
            <S.NutrientList>
              {nutritionGuidelines.decrease.map((nutrient, index) => (
                <S.NutrientTag key={index} $increase={false}>{nutrient}</S.NutrientTag>
              ))}
            </S.NutrientList>
          </S.GuidelineContent>
        </S.GuidelineBox>
      </S.GuidelinesSection>

      <S.Question>추천을 받아들이겠습니까?</S.Question>
      <S.ButtonGroup>
        <S.AcceptButton onClick={onRegister}>등록</S.AcceptButton>
      </S.ButtonGroup>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
  `,
  
  Title: styled.h2`
    font-size: 20px;
    color: #333;
    margin-bottom: 24px;
    text-align: center;
  `,

  RecommendationSection: styled.div`
    margin-bottom: 32px;
    text-align: center;
  `,

  RecommendationTitle: styled.h3`
    font-size: 18px;
    color: #333;
    margin-bottom: 12px;
  `,

  Description: styled.p`
    font-size: 16px;
    color: #666;
    line-height: 1.5;
  `,

  GuidelinesSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
  `,

  GuidelineBox: styled.div`
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
  `,

  GuidelineContent: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  GuidelineTitle: styled.h3`
    font-size: 12px;
    color: #333;
    white-space: nowrap;
  `,

  NutrientList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  `,

  NutrientTag: styled.span<{ $increase: boolean }>`
    font-size: 12px;
    color: ${props => props.$increase ? '#4CAF50' : '#FF5252'};
  `,

  Question: styled.p`
    font-size: 18px;
    color: #333;
    text-align: center;
    margin-bottom: 24px;
  `,

  ButtonGroup: styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
  `,

  AcceptButton: styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #4CAF50;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #45a049;
    }
  `,
  
  Arrow: styled.span<{ $direction: 'up' | 'down' }>`
    font-size: 16px;
    color: ${props => (props.$direction === 'up' ? '#4CAF50' : '#FF5252')};
    margin: 0 4px;
  `
};

export default DietAnalysis;