import styled from "styled-components";
import Header from "@components/features/Header";

const CommunityPage = () => {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

export default CommunityPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
