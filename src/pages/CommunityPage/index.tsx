import styled from "styled-components";
import Header from "@components/features/Header";
import Button from "@components/common/Button";
import UserListItem from "@components/CommunityPage/UserListItem";
import { FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RouterPath } from "@routes/path";
import Menubar from "@components/features/Menubar";
import { communityPersonInfo } from "./data";

const CommunityPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <FilterContainer>
            <Button bgColor="#fff" color="#000">
              전체
            </Button>
            <Button>심근경색</Button>
            <Button bgColor="#fff" color="#000">
              50대
            </Button>
            <Button bgColor="#fff" color="#000">
              여성
            </Button>
          </FilterContainer>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                width: "80%",
                height: "8px",
                borderRadius: "50px",
              }}
            />
          </div>
          <UserListContainer>
            {communityPersonInfo.map((person) => {
              return (
                <UserLink to={RouterPath.postPage}>
                  <UserListItem name={person.name} per={person.per} />
                </UserLink>
              );
            })}
          </UserListContainer>
        </Content>
        <StyledLink to={RouterPath.postWritePage}>
          <FaPen /> 글쓰기
        </StyledLink>
      </Wrapper>
      <Menubar />
    </>
  );
};

export default CommunityPage;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 10px;
  overflow: hidden;
  margin: 40px 0 40px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 15px;
  overflow-x: scroll;
  white-space: nowrap;
  height: 100px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserListContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  place-items: center;
  overflow-y: scroll;
  flex-grow: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e87c6c;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 7px 15px;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff4d4d;
    transform: scale(1.05);
  }

  svg {
    margin-right: 8px;
    font-size: 16px;
  }
`;

const UserLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 180px;
  display: flex;
  justify-content: center;
`;
