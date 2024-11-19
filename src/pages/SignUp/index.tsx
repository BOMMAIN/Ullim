import React from "react";
import styled from "styled-components";

const SignUp = () => {
  return (
    <Container>
      <BackButton
        src="https://cdn.pixabay.com/photo/2020/03/22/15/19/arrow-4957487_1280.png"
        alt="Back"
      />
      <br></br><br></br><br></br>
      <Title>정보를 입력해주세요</Title>
      <Description>같은 진단을 받은 분들의 글을 먼저 보여드려요</Description>
      
      <Form>
        <Row>
          <Label>Nickname</Label>
          <Input type="text" placeholder="Nickname" />
        </Row>

        <Row>
          <Label>나이</Label>
          <Select>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대</option>
            <option value="70">70대</option>
            <option value="80">80대</option>
            <option value="90">90대</option>
          </Select>
        </Row>

        <Row>
          <Label>성별</Label>
          <GenderContainer>
            <GenderButton>여성</GenderButton>
            <GenderButton>남성</GenderButton>
          </GenderContainer>
        </Row>

        <Row>
          <Label>진단명</Label>
          <InputWithIcon>
            <Input type="text" placeholder="진단명 입력" />
            <SearchIcon>🔍</SearchIcon>
          </InputWithIcon>
        </Row>

        <Row>
          <Label>진단서(선택)</Label>
          <FileUpload>
            Drag your file(s) or <BrowseLink>browse</BrowseLink>
            <SmallText>Max 10 MB files are allowed</SmallText>
          </FileUpload>
        </Row>

        <Row>
          <Label>심전도(선택)</Label>
          <FileUpload>
            Drag your file(s) or <BrowseLink>browse</BrowseLink>
            <SmallText>Max 10 MB files are allowed</SmallText>
          </FileUpload>
        </Row>

        <Terms>
          <input type="checkbox" />
          <TermsText>I accept the terms and privacy policy</TermsText>
        </Terms>

        <SubmitButton>Continue</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 800px; /* 최대 너비 */
  margin: 0 auto;
  padding: 30px;
  background-color: #F4EAE0;
  box-sizing: border-box;
  position: relative;
`;

const BackButton = styled.img`
  position: absolute; /* 부모 요소를 기준으로 절대 위치 */
  left: 20px; /* 왼쪽으로 이동할 거리 */
  top: 40px; /* 상단에서의 거리 */
  width: 30px;
  cursor: pointer;
  z-index: 1000;
`;


const Title = styled.h1`
  font-size: 32px; /* 제목 크기 증가 */
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px; /* 설명 글씨 크기 증가 */
  color: #736f6b;
  margin-bottom: 30px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  margin-bottom: 30px; /* 각 입력 필드 간 간격 증가 */
`;

const Label = styled.label`
  font-size: 18px; /* 라벨 크기 증가 */
  color: #333;
  margin-bottom: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  height: 50px; /* 입력 필드 높이 증가 */
  border: 1px solid #ccc;
  border-radius: 8px; /* 테두리 곡률 증가 */
  padding: 0 15px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  height: 50px; /* 선택 박스 높이 증가 */
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
`;

const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GenderButton = styled.button`
  width: 48%;
  height: 50px; /* 버튼 높이 증가 */
  background-color: #f8ede8;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f4e2da;
  }
`;

const InputWithIcon = styled.div`
  position: relative;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 15px; /* 아이콘 위치 조정 */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
`;

const FileUpload = styled.div`
  border: 2px dashed #ccc; /* 테두리 두께 증가 */
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #999;
`;

const BrowseLink = styled.span`
  color: #e87c6c;
  cursor: pointer;
  font-weight: bold; /* 강조 표시 */
`;

const SmallText = styled.p`
  font-size: 14px;
  color: #999;
  margin-top: 10px;
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const TermsText = styled.span`
  font-size: 17px;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  background-color: #e87c6c;
  color: white;
  border: none;
  border-radius: 8px;
  height: 50px; /* 버튼 높이 증가 */
  font-size: 18px; /* 버튼 글씨 크기 증가 */
  cursor: pointer;
  width: 100%; /* 버튼 너비 확장 */

  &:hover {
    background-color: #f45671;
  }
`;

export default SignUp;
