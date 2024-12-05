import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@routes/path';
import React from 'react';
import styled from 'styled-components';

// Onboarding1 컴포넌트 정의
const Onboarding1 = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image
        src="/images/울림로고.png"
        alt="쉽게 이해하는 심전도"
      />
      <Description>
        심장질환 커뮤니티
      </Description>
      <Title>울림</Title>
      <NextButton onClick={() => navigate(RouterPath.onboarding2)}>시작하기</NextButton> {/* 시작하기 버튼 추가 */}
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
  position: relative; /* 자식 요소의 절대 위치 기준 설정 */
`;

// 이미지 스타일 정의
const Image = styled.img`
  width: 150px; /* 이미지 너비 설정 */
  margin-bottom: 20px; /* 이미지와 설명 사이 간격 */
`;

// 설명 스타일 정의
const Description = styled.p`
  font-size: 18px; /* 설명 글씨 크기 설정 */
  max-width: 600px; /* 설명 텍스트 최대 너비 설정 */
  margin-bottom: 10px; /* 설명과 제목 사이 간격 */
`;

// 제목 스타일 정의
const Title = styled.h1`
  font-weight: bold; /* 제목을 볼드체로 설정 */
  font-size: 36px; /* 제목 글씨 크기 설정 */
  margin-bottom: 20px; /* 제목과 버튼 사이 간격 */
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





export default Onboarding1;
