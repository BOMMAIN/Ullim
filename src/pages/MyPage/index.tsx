import React from 'react';
import styled from 'styled-components';
import '../../index.css';

const MyPage = () => {
  return (
    <Container>
      {/* 프로필 영역 */}
      <ProfileContainer>
        <ProfileImage
          src="https://via.placeholder.com/50"
          alt="Profile"
        />
        <ProfileInfo>
          <ProfileName>닉네임</ProfileName>
          <Logout>로그아웃 &gt;</Logout>
        </ProfileInfo>
      </ProfileContainer>
      <Bar />
      {/* 메뉴 리스트 */}
      <MenuContainer>
        <MenuItem title="심전도 분석 결과 기록 확인하기" />
        <MenuItem title="회원정보 수정하기" />
        <MenuItem title="작성한 글 모아보기" />
        <MenuItem title="북마크한 글 모아v 보기" />
        <MenuItem title="환경설정" />
      </MenuContainer>
    </Container>
  );
};

type MenuItemProps = {
  title: string;
};

const MenuItem = ({ title }: MenuItemProps) => (
  <MenuItemContainer>
    <span>{title}</span>
    <MenuIcon>&gt;</MenuIcon>
  </MenuItemContainer>
);

const Container = styled.div`
  background-color: #F4EAE0;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  `;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProfileName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Logout = styled.span`
  font-size: 14px;
  color: #E87C6C;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  margin-top: 10px;
`;

const MenuItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0;
  font-size: 16px;
  color: #333;
`;

const MenuIcon = styled.span`
  font-size: 18px;
  color: #E87C6C;
`;

const Bar = styled.hr`
  height: 2px; /* 선의 두께 설정 */
  border: none; /* 기본 테두리 제거 */
  background-color: #fff; /* 선의 색상 설정 */
  margin: 20px 0; /* 선 위아래 여백 설정 */
`;

export default MyPage;