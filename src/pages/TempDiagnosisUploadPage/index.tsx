import React, { useState } from 'react';
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

export const TempDiagnosisUploadPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      navigate('/analyze-diagnosis', { state: { imageUrl } });
    }
  };
  
  return (
    <UploadContainer>
      <UploadBox>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ opacity: 0, position: 'absolute' }}  // 이렇게 수정
        id="imageUpload"
        />
        <label htmlFor="imageUpload">
          진단서 이미지를 업로드해주세요
        </label>
      </UploadBox>
    </UploadContainer>
  );
};