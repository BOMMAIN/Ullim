import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
  background-color: #f4eae0;
`;
