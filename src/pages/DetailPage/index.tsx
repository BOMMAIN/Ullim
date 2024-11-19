import Header from "@components/features/Header";
import styled from "styled-components";

import { FaUserCircle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import Comment from "@components/Detail/Comment";

const DetailPage = () => {
  return (
    <Wrapper>
      <Header />
      <Content>
        <PostHeader>
          <PersonInfo>
            <div style={{ display: "flex" }}>
              <FaUserCircle size={35} />
              <NameDate>
                닉네임 <br />
                <span style={{ color: "#979797" }}>2024.01.01 17:50</span>
              </NameDate>
            </div>
            <div
              style={{
                color: "#979797",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IoMdEye style={{ margin: "5px" }} /> 73
            </div>
          </PersonInfo>
          <PostInfo>
            <span>20대</span>
            <span>여성</span>
            <span>심근경색</span>
          </PostInfo>
          <Similarity>
            닉네임님과 ~질병으로 비슷한 고민을 갖고 있어요!
          </Similarity>
        </PostHeader>
        <Des>
          <PostTitle>심전도가 이래도 괜찮은건가요??</PostTitle>
          <PostDescription>
            제가 병원에서 심전도 검사를 해서 사진처럼 나왔는데 괜찮은건가요???
            너무 걱정되네요ㅠㅠ
          </PostDescription>
        </Des>
        <PostImage src="/images/심전도사진.png" alt="심전도" />
        <Space>
          <span>신고하기</span>
        </Space>
        <CommentSection>
          <Comment />
          <Comment />
          <Comment />
        </CommentSection>
      </Content>
    </Wrapper>
  );
};

export default DetailPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 20px 20px 30px;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 8px;
`;

const PersonInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const NameDate = styled.span`
  text-align: start;
  font-size: 14px;
  margin-left: 10px;
`;

const Des = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const PostTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const PostInfo = styled.div`
  display: flex;
  gap: 8px;
  margin: 2px 0;
  span {
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 10px;
    font-size: 0.875rem;
  }
`;

const Similarity = styled.span`
  font-size: 12px;
  color: #4a9efd;
`;

const PostDescription = styled.span`
  font-size: 14px;
  margin-bottom: 16px;
  color: #333;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Space = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 6px solid #e4ddd6;
  display: flex;
  justify-content: end;
  align-items: end;
  color: #979797;
  padding: 0 5px 5px 0;
  font-size: 12px;
`;

const CommentSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;
