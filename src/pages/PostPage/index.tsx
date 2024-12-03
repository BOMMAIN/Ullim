import styled from "styled-components";
import Header from "@components/features/Header";
import PostItem from "@components/PostPage/PostItem";
import { useState } from "react";
import { PiLineVertical } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { RouterPath } from "@routes/path";
import Menubar from "@components/features/Menubar";
import { postData } from "@components/PostPage/data";

const PostPage = () => {
  type FilterType = "view" | "latest";
  const [filter, setFilter] = useState<FilterType>("view");

  const location = useLocation();
  const { name, per } = location.state || {};

  return (
    <>
      <Header />
      <Wrapper>
        <Title>{name}님의 글</Title>
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
          {postData.map((post) => {
            return (
              <Link
                to={RouterPath.postDetailPage}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <PostItem
                  name={name}
                  per={per}
                  title={post.title}
                  content={post.content}
                  view={post.view}
                />
              </Link>
            );
          })}
        </Contents>
      </Wrapper>
      <Menubar />
    </>
  );
};

export default PostPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 60px 0 0;
`;

const Title = styled.h2`
  text-align: start;
  margin: 0 10px 0 10px;
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
  padding: 15px 10px 0;
  height: 100%;
  width: 100%;
  padding-bottom: 90px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
