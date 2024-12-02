import styled from "styled-components";

import { IoMdHelpCircle } from "react-icons/io";
import { FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <Wrapper>
      <div style={{ fontSize: "30px", display: "flex", alignItems: "center" }}>
        Ullim
        <IoMdHelpCircle size={20} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaBell size={20} />
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: absolute;
  z-index: 1000;
  width: 430px;
  height: 60px;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: #f4eae0;
`;
