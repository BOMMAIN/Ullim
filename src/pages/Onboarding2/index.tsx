import React from 'react';
import styled from 'styled-components';

const Onboarding2 = () => {
  return (
    <Container>
      <PreviousButton>이전으로</PreviousButton> 
      <Image
        src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png"
        alt="쉽게 이해하는 심전도"
      />
      <Title>쉽게 이해하는 심전도 분석</Title>
      <Description>
        심전도 데이터를 분석하고, 쉽게 이해할 수 있는 해설을 제공합니다.
      </Description>
      <NextButton>다음</NextButton> {/* 시작하기 버튼 추가 */}
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
  width: 500px; /* 가로로 기다란 버튼 너비 */
  height: 50px; /* 버튼 높이 설정 */
  border-radius: 25px; /* 둥근 모서리 설정 */
  background-color: #E87C6C; /* 버튼 배경색 설정 */
  color: white; /* 버튼 글자색 설정 */
  border: none; /* 기본 테두리 없애기 */
  font-size: 16px; /* 버튼 글씨 크기 설정 */
  cursor: pointer; /* 포인터 커서 설정 */

  /* 호버 효과 추가 */
  &:hover {
    background-color: #f45671; /* 마우스 호버 시 배경색 변경 */
  }
`;

const PreviousButton = styled.button`
  position: absolute; /* 컨테이너 내에서 절대 위치 설정 */
  top: 20px; /* 컨테이너 상단으로부터의 거리 설정 */
  left: 50%; /* 컨테이너의 중간에 위치 */
  transform: translateX(-50%); /* 버튼을 정확히 중앙으로 이동 */
  width: 100px; /* 버튼의 너비 설정 */
  height: 50px; /* 버튼의 높이 설정 */
  border-radius: 25px; /* 버튼의 모서리를 둥글게 설정 */
  background-color: #E87C6C; /* 버튼의 배경색 설정 */
  color: white; /* 버튼의 텍스트 색상 설정 */
  border: none; /* 버튼의 기본 테두리 제거 */
  font-size: 16px; /* 버튼 텍스트의 크기 설정 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */

  /* 호버 시 배경색 변경 효과 */
  &:hover {
    background-color: #f45671; /* 호버 시 배경색 변경 */
  }
`;

export default Onboarding2;