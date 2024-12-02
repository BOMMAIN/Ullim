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
      <MenubarItem>
        <IoChatboxEllipses
          size={25}
          onClick={() => navigate(RouterPath.communityPage)}
        />
        <MenubarTitle>챗봇</MenubarTitle>
      </MenubarItem>
      <MenubarItem>
        <FaNoteSticky size={25} onClick={() => navigate(RouterPath.record)} />
        <MenubarTitle>기록</MenubarTitle>
      </MenubarItem>
      <MenubarItem>
        <MdLocalGroceryStore
          size={25}
          onClick={() => navigate(RouterPath.shopping)}
        />
        <MenubarTitle>스토어</MenubarTitle>
      </MenubarItem>
      <MenubarItem>
        <IoPersonSharp size={25} onClick={() => navigate(RouterPath.myPage)} />
        <MenubarTitle>마이페이지</MenubarTitle>
      </MenubarItem>
    </Wrapper>
  );
};

export default Menubar;

const Wrapper = styled.div`
  position: absolute;
  z-index: 1000;
  width: 430px;
  height: 50px;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
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
