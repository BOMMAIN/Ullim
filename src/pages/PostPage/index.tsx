import styled from "styled-components";
import Header from "@components/features/Header";
import PostItem from "@components/PostPage/PostItem";
import { useState } from "react";
import { PiLineVertical } from "react-icons/pi";

const PostPage = () => {
  type FilterType = "view" | "latest";
  const [filter, setFilter] = useState<FilterType>("view");
  return (
    <Wrapper>
      <Header />
      <Title>닉네임님의 글</Title>
      <Filter>
        <ViewSort
          isActive={filter === "view"}
          onClick={() => setFilter("view")}
        >
          조회순
        </ViewSort>{" "}
        <PiLineVertical />
        <Latest
          isActive={filter === "latest"}
          onClick={() => setFilter("latest")}
        >
          최신순
        </Latest>
      </Filter>
      <Contents>
        <PostItem />
        <PostItem />
      </Contents>
    </Wrapper>
  );
};

export default PostPage;

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

const Filter = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  font-size: 12px;
  justify-content: right;
  margin-right: 15px;
  cursor: pointer;
`;

const Contents = styled.div`
  padding: 15px 10px;
  height: 100%;
  width: 100%;
`;

const ViewSort = styled.span<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "bold" : "none")};
  margin-right: 4px;
  text-align: center;
`;

const Latest = styled.span<{ isActive: boolean }>`
  font-weight: ${(props) => (props.isActive ? "bold" : "none")};
  margin-left: 4px;
  text-align: center;
`;
