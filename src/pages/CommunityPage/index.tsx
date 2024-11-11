import styled from "styled-components";
import Header from "@components/features/Header";
import PostItem from "@components/CommunityPage/PostItem";

const CommunityPage = () => {
  return (
    <Wrapper>
      <Header />
      <Title>닉네임님의 글</Title>
      <Filter>조회순 | 최신순</Filter>
      <Contents>
        <PostItem />
        <PostItem />
      </Contents>
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

const Title = styled.h2`
  text-align: start;
  margin: 70px 10px 0 20px;
`;

const Filter = styled.span`
  color: #888;
  font-size: 12px;
  text-align: right;
  margin-right: 15px;
`;

const Contents = styled.div`
  padding: 15px 10px;
  height: 100%;
  width: 100%;
`;
