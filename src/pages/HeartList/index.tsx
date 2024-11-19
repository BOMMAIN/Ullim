import React from 'react';
import styled from 'styled-components';
import '../../index.css';


const HeartList = () => {
  return (
    <Container>
        <Title>심전도 분석 결과 기록</Title>

        <Bar />

        <ListContainer>
          <List>
            <Heartimg 
              src="https://via.placeholder.com/50"
              alt="Profile"  
            />
            <Date>2024.01.01</Date>
            <DetailsButton>&gt;</DetailsButton>
          </List>
          <List>
            <Heartimg 
              src="https://via.placeholder.com/50"
              alt="Profile"  
            />
            <Date>2024.05.01</Date>
            <DetailsButton>&gt;</DetailsButton>
          </List>
        </ListContainer>
        <CheckButton>
          검사하기
        </CheckButton>
    </Container>
  );
}

const Bar = styled.hr`
  height: 2px; /* 선의 두께 설정 */
  border: none; /* 기본 테두리 제거 */
  background-color: #E87C6C; /* 선의 색상 설정 */
  margin: 20px 0; /* 선 위아래 여백 설정 */
`;


const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
`

const Container = styled.div`
  background-color: #F4EAE0;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
`;



const ListContainer = styled.div`
  margin-top: 10px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  font-size: 16px;
  color: #333;
`;

const Heartimg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px; /* 이미지와 날짜 사이에 간격 추가 */

`
const DetailsButton = styled.div`
  font-size : 30px;
`

const Date = styled.div`
  font-size : 22px;
`

const CheckButton = styled.button`
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


export default HeartList


