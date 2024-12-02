import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const baseWidth = 375; // 디자인 기준 너비(px)
    const baseHeight = 812; // 디자인 기준 높이(px)

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // 가로, 세로 비율 중 작은 값을 선택하여 스케일링 팩터로 사용
      const scaleWidth = screenWidth / baseWidth;
      const scaleHeight = screenHeight / baseHeight;
      const scaleFactor = Math.min(scaleWidth, scaleHeight);

      setScale(scaleFactor);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Wrapper>
      <ContentWrapper
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <Outlet />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 가운데 정렬 */
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 스크롤바 숨기기 */
  background-color: #f4eae0;
`;

const ContentWrapper = styled.div`
  width: 375px; /* 고정된 너비 */
  height: 812px; /* 고정된 높이 */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
