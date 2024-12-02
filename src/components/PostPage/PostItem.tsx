import styled from "styled-components";
import { IoMdEye } from "react-icons/io";

const PostItem = () => {
  return (
    <Container>
      <NameInfo>
        닉네임 <span style={{ color: "#888" }}>| 심근경색</span>
      </NameInfo>
      <Title>나이 50에 심근경색은 흔한건가요??</Title>
      <Content>
        어제 심근경색 판정을 받은 사람입니다.
        <br />
        ...
      </Content>
      <BottomContainer>
        <Des>닉네임님의 상황과 74% 비슷해요!</Des>
        <View>
          <IoMdEye /> 100
        </View>
      </BottomContainer>
    </Container>
  );
};

export default PostItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 150px;
  padding: 10px;
  box-shadow: 4px 4px 10px #aaa;
  background-color: #fff;
  margin: 0 0 20px;
`;

const NameInfo = styled.span`
  font-size: 15px;
`;

const Title = styled.h3`
  margin: 5px 0 10px;
`;

const Content = styled.span`
  font-size: 12px;
  text-align: start;
  color: #888;
`;

const BottomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 0;
`;

const Des = styled.span`
  font-size: 10px;
  color: #4a9efd;
`;

const View = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
`;
