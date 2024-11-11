import styled from "styled-components";
import Header from "@components/features/Header";
import Button from "@components/common/Button";
import UserListItem from "@components/CommunityPage/UserListItem";

const CommunityPage = () => {
  return (
    <Wrapper>
      <Header />
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
          <Button bgColor="#fff" color="#000">
            ???
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
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
          <UserListItem />
        </UserListContainer>
      </Content>
    </Wrapper>
  );
};

export default CommunityPage;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
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
  margin: 5px 0 0 10px;
  padding: 10px 0 20px 0;
  gap: 15px;
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserListContainer = styled.div`
  width: 100%;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  place-items: center;
  overflow-y: auto;
  flex-grow: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;
