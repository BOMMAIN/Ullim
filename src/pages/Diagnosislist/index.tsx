import React from 'react';
import styled from 'styled-components';
import '../../index.css';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Diagnosislist = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <Container>
      <br></br>
      <Header>
        <PrevButton onClick={goBack}>
          <MdNavigateBefore />
        </PrevButton>
        <Title>진단서 분석 및 요약 기록</Title>
      </Header>
      <Bar />
      <ListContainer>
        <List>
          <Heartimg 
            src="/images/진단서2.jpg"
            alt="Profile"  
          />
          <Date>2024.01.01</Date>
          <DetailsButton>
            <MdNavigateNext />
          </DetailsButton>
        </List>
        <List>
          <Heartimg 
            src="/images/진단서3.jpg"
            alt="Profile"  
          />
          <Date>2024.05.01</Date>
          <DetailsButton>
            <MdNavigateNext />
          </DetailsButton>
        </List>
      </ListContainer>
      <CheckButton>
        진단서 분석 및 요약하기
      </CheckButton>
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: center; /* 기본적으로 가운데 정렬 */

  position: relative; /* PrevButton을 정확히 왼쪽에 위치시키기 위해 사용 */
`;

const PrevButton = styled.button`
  position: absolute;
  left: 0;
  font-size: 25px;
  color: #E87C6C;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin: 0;
`;

const Bar = styled.hr`
  height: 1px; 
  background-color : #e87c6c70; 
  border: none;
  margin: 30px 0; 
`;

const Container = styled.div`
  background-color: #F4EAE0;
  height: 100vh;
  width: 380px;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
`;

const ListContainer = styled.div`
  margin-top: 10px;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 0;
  font-size: 16px;
  color: #333;
`;

const Heartimg = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px; /* 이미지와 날짜 사이 간격 */
  flex-shrink: 0; /* 이미지 크기 고정 */
`;

const Date = styled.div`
  font-size: 16px;
  display: flex;
  align-items: left;
  
`;

const DetailsButton = styled.div`
  font-size: 25px;
  color: #E87C6C;
  flex-shrink: 0; /* 버튼 크기 고정 */
  display: flex;
  align-items: center; /* 아이콘 수직 중앙 정렬 */
  margin-left: auto
`;

const CheckButton = styled.button`
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
    background-color: #e87c6c70 /* 마우스 호버 시 배경색 변경 */
  }
`;

export default Diagnosislist;
