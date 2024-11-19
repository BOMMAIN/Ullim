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
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 2vh;
  box-sizing: border-box;
  overflow: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* 그림자 추가 */
  border-radius: 8px;  /* 모서리를 둥글게 */
`;
