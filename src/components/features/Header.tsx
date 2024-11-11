import styled from "styled-components";

import { IoMdHelpCircle } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "@routes/path";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div style={{ fontSize: "30px", display: "flex", alignItems: "center" }}>
        Ullim
        <IoMdHelpCircle size={20} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaBell size={30} />
        <IoPersonSharp
          size={30}
          style={{ marginLeft: "8px", cursor: "pointer" }}
          onClick={() => navigate(RouterPath.myPage)}
        />
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  width: 350px;
  height: 60px;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: #f4eae0;
`;
