import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

interface CommentProps {
  name: string;
  content: string;
  date: string;
}

const Comment = ({ name, content, date }: CommentProps) => {
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
          <FaUserCircle size={30} style={{ margin: "5px" }} /> {name}
        </div>
        <Date>{date}</Date>
      </div>
      <Content>{content}</Content>
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
