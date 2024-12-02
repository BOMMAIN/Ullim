import React from 'react';
import styled from 'styled-components';
import '../../index.css';
import { MdNavigateNext } from "react-icons/md";

const HeartList = () => {
  return (
    <Container>
      <br></br>
      <Title>심전도 분석 결과 기록</Title>
      <Bar />
      <ListContainer>
        <List>
          <Heartimg 
            src="/images/심전도1.png"
            alt="Profile"  
          />
          <Date>2024.01.01</Date>
          <DetailsButton>
            <MdNavigateNext />
          </DetailsButton>
        </List>
        <List>
          <Heartimg 
            src="/images/심전도2.png"
            alt="Profile"  
          />
          <Date>2024.05.01</Date>
          <DetailsButton>
            <MdNavigateNext />
          </DetailsButton>
        </List>
      </ListContainer>
      <CheckButton>
        검사하기
      </CheckButton>
    </Container>
  );
};

const Bar = styled.hr`
  height: 2px; 
  border: none; 
  margin: 20px 0; 
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
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
    background-color: #f45671; /* 마우스 호버 시 배경색 변경 */
  }
`;

export default HeartList;
