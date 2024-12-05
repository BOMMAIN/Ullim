import React from "react";
import styled from "styled-components";
import "../../index.css";
import { MdNavigateNext } from "react-icons/md";
import Menubar from "@components/features/Menubar";
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@routes/path';
import { FaUserCircle } from "react-icons/fa";


const MyPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      {/* 프로필 영역 */}
      <ProfileContainer>
        <FaUserCircle size="50" color="#9d6f68" style={{marginRight: "10px"}}/>
        <ProfileInfo>
          <ProfileName>심정호 님</ProfileName>
          <Logout onClick={() => navigate(RouterPath.login)}>
            로그아웃
            <MdNavigateNext />
          </Logout>
        </ProfileInfo>
      </ProfileContainer>
      <Bar />
      {/* 메뉴 리스트 */}
      <MenuContainer>
        <MenuItem title="심전도 분석 결과 기록 확인하기" onclick={() => navigate(RouterPath.heartlist)}/>
        <MenuItem title="진단서 분석 및 요약 기록 확인하기" onclick={() => navigate(RouterPath.diagnosislist)}/>
        <MenuItem title="회원정보 수정하기"  onclick={() => navigate(RouterPath.edit)}/>
      </MenuContainer>
      <Menubar />
    </Container>
  );
};

type MenuItemProps = {
  title: string;
  onclick: () => void;
};

const MenuItem = ({ title, onclick }: MenuItemProps) => (
  <MenuItemContainer onClick={onclick}>
    <span>{title}</span>
    <MenuIcon>
      <MdNavigateNext />
    </MenuIcon>
  </MenuItemContainer>
);

const Container = styled.div`
  background-color: #f4eae0;
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
  color: #e87c6c;
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
  cursor: pointer;
`;

const MenuIcon = styled.span`
  font-size: 20px;
  color: #e87c6c;
`;

const Bar = styled.hr`
  height: 2px;
  border: none;
  background-color: #fff;
  margin: 20px 0;
`;

export default MyPage;
