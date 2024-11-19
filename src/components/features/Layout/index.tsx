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
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 90vw; 
  height: 100%;
  max-width: 600px;
  background-color: #F4EAE0;
  display: flex;
  flex-direction: column;
  padding: 2vh;
  box-sizing: border-box;
  overflow: auto;
`;
