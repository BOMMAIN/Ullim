import styled from "styled-components";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "@routes/path";

const Menubar = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <MenubarItem onClick={() => navigate(RouterPath.communityPage)}>
        <IoHome size={25} />
        <MenubarTitle>커뮤니티</MenubarTitle>
      </MenubarItem>
      <MenubarItem onClick={() => navigate(RouterPath.communityPage)}>
        <IoChatboxEllipses size={25} />
        <MenubarTitle>챗봇</MenubarTitle>
      </MenubarItem>
      <MenubarItem onClick={() => navigate(RouterPath.record)}>
        <FaNoteSticky size={25} />
        <MenubarTitle>기록</MenubarTitle>
      </MenubarItem>
      <MenubarItem onClick={() => navigate(RouterPath.shopping)}>
        <MdLocalGroceryStore size={25} />
        <MenubarTitle>스토어</MenubarTitle>
      </MenubarItem>
      <MenubarItem onClick={() => navigate(RouterPath.myPage)}>
        <IoPersonSharp size={25} />
        <MenubarTitle>마이페이지</MenubarTitle>
      </MenubarItem>
    </Wrapper>
  );
};

export default Menubar;

const Wrapper = styled.div`
  position: fixed; /* 화면의 가장 아래 고정 */
  z-index: 1000;
  width: 430px; /* 부모 컨테이너에 맞게 확장 */
  max-width: 768px; /* 최대 너비 설정 */
  height: 45px;
  bottom: 0;
  left: 50%; /* 중앙 정렬을 위해 */
  transform: translateX(-50%); /* 중앙 정렬 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  background-color: #f4eae0;
`;

const MenubarItem = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const MenubarTitle = styled.span`
  font-size: 10px;
  font-weight: bold;
`;
