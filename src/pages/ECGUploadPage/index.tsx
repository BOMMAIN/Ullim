// pages/ECGUploadPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UploadContainer = styled.div`
  margin: 2rem auto;
  width: 24rem;
  text-align: center;
`;

const UploadBox = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 0.5rem;
  padding: 2rem;
  cursor: pointer;
  &:hover {
    border-color: #93c5fd;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

export const ECGUploadPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError('');
  
      if (file) {
        // JSON 파일인지 확인
        if (file.type !== 'application/json') {
          setError('JSON 파일만 업로드 가능합니다.');
          return;
        }
  
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const jsonData = JSON.parse(content);
            
            // 분석 페이지로 이동하면서 파일과 파싱된 데이터 모두 전달
            navigate('/analyze-processing-page', { 
              state: { 
                file: file,  // 원본 파일 전달
                isFromSignup: false,
                signupData: {
                  ecgFile: file
                }
              } 
            });
          } catch (error) {
            setError('유효하지 않은 JSON 파일입니다.');
          }
        };
        
        reader.readAsText(file);
      }
    };

  return (
    <UploadContainer>
      <UploadBox>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          style={{ opacity: 0, position: 'absolute' }}
          id="jsonUpload"
        />
        <label htmlFor="jsonUpload">
          심전도 JSON 파일을 업로드해주세요
        </label>
      </UploadBox>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </UploadContainer>
  );
};

export default ECGUploadPage;