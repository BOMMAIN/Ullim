import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@routes/path';

const Onboarding4 = () => {
  const navigate = useNavigate();
  return (
    <Container>   
      <Image
        src="/images/온보딩4.png"
        alt="쉽게 이해하는 심전도"
      />
      <Title>쉽게 이해하는 진단서</Title>
      <Description>
      어려운 의학 정보를 이해하기 쉽게 요약하여, 
      <br></br>내 건강 상태를 보다 정확히 파악하세요.
      </Description>
      <NextButton onClick={() => navigate(RouterPath.login)}>진짜 시작하기!! 렛츠꼬! </NextButton> {/* 시작하기 버튼 추가 */}
    </Container>
  );
};

// 컨테이너 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column; /* 수직 방향 정렬 */
  align-items: center; /* 가로축 중앙 정렬 */
  justify-content: center; /* 세로축 중앙 정렬 */
  text-align: center; /* 텍스트 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 사용 */
  padding: 20px; /* 내부 여백 추가 */
`;

// 이미지 스타일 정의
const Image = styled.img`
  width: 300px; /* 이미지 너비 설정 */
  margin-bottom: 20px; /* 이미지와 제목 사이 간격 */
`;

// 제목 스타일 정의
const Title = styled.h1`
  font-weight: bold; /* 제목을 볼드체로 설정 */
  font-size: 24px; /* 제목 글씨 크기 설정 */
  margin-bottom: 10px; /* 제목과 설명 사이 간격 */
`;

// 설명 스타일 정의
const Description = styled.p`
  font-size: 16px; /* 설명 글씨 크기 설정 */
  max-width: 600px; /* 설명 텍스트 최대 너비 설정 */
`;

// 버튼 스타일 정의
const NextButton = styled.button`
  position: absolute; /* 절대 위치 설정 */
  bottom: 20px; /* 컨테이너 아래쪽 여백 20px */
  left: 50%; /* 수평 중앙 정렬을 위해 */
  transform: translateX(-50%); /* 수평 중앙 정렬 조정 */
  width: 350px; /* 가로로 기다란 버튼 너비 */
  height: 50px; /* 버튼 높이 설정 */
  border-radius: 25px; /* 둥근 모서리 설정 */
  background-color: #E87C6C; /* 버튼 배경색 설정 */
  color: white; /* 버튼 글자색 설정 */
  border: none; /* 기본 테두리 없애기 */
  font-size: 16px; /* 버튼 글씨 크기 설정 */
  cursor: pointer; /* 포인터 커서 설정 */

  /* 호버 효과 추가 */
  &:hover {
    background-color: #e87c6c70; /* 마우스 호버 시 배경색 변경 */
  }
`;

export default Onboarding4;
