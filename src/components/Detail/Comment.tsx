import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const Comment = () => {
  return (
    <CommentWrapper>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaUserCircle size={40} style={{ margin: "5px" }} /> 사이버 닥터
        </div>
        <Date>2024.01.01 17:53</Date>
      </div>
      <Content>
        올려주신 사진으로 보아 큰 이상은 없는 것 같습니다.
        <br />
        안심하시고 결과 기다리시면 되겠습니다.
      </Content>
    </CommentWrapper>
  );
};

export default Comment;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid #e4ddd6;
`;

const Date = styled.span`
  color: #979797;
`;

const Content = styled.span`
  font-size: 12px;
  text-align: start;
  padding: 0 0 10px 10px;
`;
