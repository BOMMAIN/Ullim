import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUser } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { FaFileCirclePlus } from "react-icons/fa6";
import { RouterPath } from "@routes/path";

const PostWritePage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <CustomHeader>
        <BackButton>
          <IoChevronBack onClick={() => navigate(RouterPath.communityPage)} />
        </BackButton>
        <HeaderTitle>글쓰기</HeaderTitle>
        <Icons>
          <FaBell size={20} />
          <FaUser size={20} onClick={() => navigate(RouterPath.myPage)} />
        </Icons>
      </CustomHeader>
      <Wrapper>
        <Form>
          <Input placeholder="제목을 입력해주세요." />
          <Textarea placeholder="나누고 싶은 이야기를 작성해 주세요." />
          <ImageButton>
            <LuImagePlus />
          </ImageButton>
        </Form>
        <SubmitButton>
          <FaFileCirclePlus />
          등록
        </SubmitButton>
      </Wrapper>
    </div>
  );
};

export default PostWritePage;

const CustomHeader = styled.div`
  position: fixed;
  top: 0;
  width: 410px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  z-index: 1000;
  background-color: #f4eae0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const Icons = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  color: #333;

  svg {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 50px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
`;

const Input = styled.input`
  background-color: #f4eae0;
  border: 1px solid #000;
  padding: 10px;
  font-size: 16px;
  outline: none;
  border-radius: 5px;

  &::placeholder {
    color: #888;
  }
`;

const Textarea = styled.textarea`
  background-color: #f4eae0;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 15px;
  font-size: 16px;
  height: 600px;
  resize: none;
  outline: none;
  margin-top: 10px;

  &::placeholder {
    color: #888;
  }
`;

const ImageButton = styled.button`
  background-color: #e87c6c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #ff4d4d;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 0px;
  right: 20px;
  background-color: #888;
  font-weight: bold;
  color: white;
  border: none;
  padding: 7px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #aaa;
    transform: scale(1.05);
  }
  svg {
    margin-right: 8px;
    font-size: 16px;
  }
`;
