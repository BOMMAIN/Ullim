import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { DiagnosisData } from '../../types/diagnosis';
import { saveDiagnosisRecord } from '../../utils/diagnosisStorage';
import { v4 as uuidv4 } from 'uuid';

const scan = keyframes`
  0% { transform: translateY(-100%); }
  50% { transform: translateY(50%); }
  100% { transform: translateY(100%); }
`;

// 스타일 컴포넌트 정의
const Container = styled.div`
  margin-bottom: 1.5rem;
  width: 24rem;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #f87171;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const DateText = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Content = styled.div`
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

const TableHeader = styled.th<{ $width?: string }>`
  padding: 0.75rem 1rem;
  text-align: left;
  background-color: #f9fafb;
  width: ${(props) => props.$width || 'auto'};
`;

const TableData = styled.td`
  padding: 0.75rem 1rem;
`;

const SummaryContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const SummaryTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 1rem;
`;

const SummaryList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #4b5563;
`;

const SummaryItem = styled.li`
  margin-bottom: 1rem;
  padding-left: 1.25rem;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #6b7280;
  }
`;

const DiagnosisImageContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  margin-bottom: 16px;
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
`;

const MedicalReportResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("MedicalReport state:", location.state);

  const { 
    imageUrl, 
    data,
    isFromSignup,
    signupData 
  } = location.state || {};

  const handleClose = () => {
    const record = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      imageUrl,
      data,
      analysisDate: new Date().toISOString()
    };
  
    saveDiagnosisRecord(record);
  
    if (isFromSignup) {
      navigate('/signup', {
        state: {
          signupData: signupData,
          diagnosisAnalyzed: true,
          diagnosisResult: record,
          diagnosisImageUrl: imageUrl 
        }
      });
    } else  {
      navigate('/diagnosislist');
    }
  };

return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>진단서 분석 결과 확인하기</Title>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </HeaderContent>
      </Header>

      <Content>
        <DiagnosisImageContainer>
          <DiagnosisImage src={imageUrl} alt="진단서" />
        </DiagnosisImageContainer>

        <TableContainer>
          <Table>
            <tbody>
              <TableRow>
                <TableHeader>병명</TableHeader>
                <TableData>
                  {data.mainDisease && <div>(주) {data.mainDisease}</div>}
                  {data.subDisease && <div className="text-gray-500">(부) {data.subDisease}</div>}
                </TableData>
              </TableRow>
              <TableRow>
                <TableHeader>치료 내용</TableHeader>
                <TableData>{data.treatment}</TableData>
              </TableRow>
              <TableRow>
                <TableHeader>소견</TableHeader>
                <TableData>{data.opinion}</TableData>
              </TableRow>
              <TableRow>
                <TableHeader>진단일</TableHeader>
                <TableData>{data.diagnosisDate}</TableData>
              </TableRow>
            </tbody>
          </Table>
        </TableContainer>

        <SummaryContainer>
          <SummaryTitle>검사 결과 요약</SummaryTitle>
          <SummaryList>
            {data.summary.map((item: string, index: number) => (
              <SummaryItem key={index}>{item}</SummaryItem>
            ))}
          </SummaryList>
        </SummaryContainer>
      </Content>
    </Container>
  );
};

export default MedicalReportResultPage;
