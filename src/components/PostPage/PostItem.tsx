import styled from "styled-components";
import { IoMdEye } from "react-icons/io";

interface PostProps {
  name: string;
  per: number;
  title: string;
  content: string;
  view: number;
}

const PostItem = ({ name, per, title, content, view }: PostProps) => {
  return (
    <Container>
      <NameInfo>
        {name} <span style={{ color: "#888" }}>| 심근경색</span>
      </NameInfo>
      <Title>{title}</Title>
      <Content>
        {content}
        <br />
        ...
      </Content>
      <BottomContainer>
        <Des>
          {name}님의 상황과 {per}% 비슷해요!
        </Des>
        <View>
          <IoMdEye /> {view}
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
