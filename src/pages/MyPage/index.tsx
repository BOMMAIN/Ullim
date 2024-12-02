import React from 'react';
import styled from 'styled-components';
import '../../index.css';
import { MdNavigateNext } from "react-icons/md";

const MyPage = () => {
  return (
    <Container>
      {/* 프로필 영역 */}
      <ProfileContainer>
        <ProfileImage
          src="/images/프로필사진.jpg"
          alt="Profile"
        />
        <ProfileInfo>
          <ProfileName>닉네임</ProfileName>
          <Logout>
            로그아웃
            <MdNavigateNext />
          </Logout>
        </ProfileInfo>
      </ProfileContainer>
      <Bar />
      {/* 메뉴 리스트 */}
      <MenuContainer>
        <MenuItem title="심전도 분석 결과 기록 확인하기" />
        <MenuItem title="회원정보 수정하기" />
        <MenuItem title="작성한 글 모아보기" />
        <MenuItem title="북마크한 글 모아 보기" />
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
    <MenuIcon>
      <MdNavigateNext />
    </MenuIcon>
  </MenuItemContainer>
);

const Container = styled.div`
  background-color: #F4EAE0;
  height: 100vh;
  width: 380px;
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
  align-items: center;
`;

const ProfileName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Logout = styled.div`
  font-size: 14px;
  color: #E87C6C;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px; /* 텍스트와 아이콘 간격 */
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
  font-size: 20px;
  color: #E87C6C;
`;

const Bar = styled.hr`
  height: 2px;
  border: none;
  background-color: #fff;
  margin: 20px 0;
`;

export default MyPage;
