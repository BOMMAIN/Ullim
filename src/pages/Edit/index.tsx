import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const Edit = () => {
  const [diagnosisImage, setDiagnosisImage] = useState<File | null>(null);
  const [diagnosisImageUrl, setDiagnosisImageUrl] = useState<string | null>(null);
  const [ecgImage, setEcgImage] = useState<File | null>(null);
  const [ecgImageUrl, setEcgImageUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("심정호");
  const [id, setId] = useState<string>("bomain");
  const [pw, setPw] = useState<string>("1234");
  const [age, setAge] = useState("20");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (ecgImage) {
      const url = URL.createObjectURL(ecgImage);
      setEcgImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [ecgImage]);

  useEffect(() => {
    if (diagnosisImage) {
      const url = URL.createObjectURL(diagnosisImage);
      setDiagnosisImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [diagnosisImage]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "diagnosis" | "ecg") => {
    const files = event.target.files;
    if (files && files[0]) {
      if (type === "diagnosis") {
        setDiagnosisImage(files[0]);
      } else {
        setEcgImage(files[0]);
      }
    }
  };
  

  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "입력하기") {
      setIsCustomInput(true);
      setDiagnosis("");
    } else {
      setIsCustomInput(false);
      setDiagnosis(value);
    }
  };

  const handleFileReupload = (type: "diagnosis" | "ecg") => {
    if (type === "diagnosis") {
      setDiagnosisImage(null);
      setDiagnosisImageUrl(null);
    } else {
      setEcgImage(null);
      setEcgImageUrl(null);
    }
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };


  const handleSubmit = async () => {
    if (!nickname || !id || !pw || !age  || !diagnosis || !acceptTerms) {
      setErrorMessage("모든 필수 항목을 채워주세요.");
      return;
    }

    if (!ecgImage) {
      setErrorMessage("심전도 데이터를 업로드해주세요.");
      return;
    }

    setErrorMessage("");

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("id", id);
    formData.append("pw", pw);
    formData.append("age", age);
    formData.append("diagnosis", diagnosis);
    formData.append("ecg_file", ecgImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("업로드에 실패했습니다.");
      }

      const result = await response.json();
      console.log("결과:", result);
    } catch (error) {
      console.error("에러 발생:", error);
      setErrorMessage("업로드 도중 오류가 발생했습니다.");
    }
  };


  return (
    <Container>
      <Header>
        <PrevButton onClick={goBack}>
          <MdNavigateBefore />
        </PrevButton>
        <Title>회원 정보 수정</Title>
      </Header>
      <br/>
      <Description>회원 정보를 수정해보세요.</Description>

      <Form>
        <Row>
          <Label>닉네임</Label>
          <Input 
            type="text" 
            placeholder="닉네임" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
          />
        </Row>
        <Row>
          <Label>아이디</Label>
          <Input 
            type="text" 
            placeholder="아이디" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
          />
        </Row>
        <Row>
          <Label>비밀번호</Label>
          <Input 
            type="password" 
            placeholder="비밀번호" 
            value={pw} 
            onChange={(e) => setPw(e.target.value)} 
          />
        </Row>

        <Row>
          <Label>나이</Label>
          <Select value={age} onChange={(e) => setAge(e.target.value)}>
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
        <Label>진단명</Label>

        <Select value={isCustomInput ? '입력하기' : diagnosis} onChange={handleDiagnosisChange}>
        <option value="심근경색">심근경색</option>
        <option value="협심증">협심증</option>
        <option value="심부전">심부전</option>
        <option value="부정맥">부정맥</option>
        <option value="심장판막질환">심장판막질환</option>
        <option value="심근증">심근증</option>
        <option value="심장막염">심장막염</option>
        <option value="대동맥질환">대동맥질환</option>
        <option value="폐동맥고혈압">폐동맥고혈압</option>
        <option value="입력하기">입력하기</option>
        </Select>

        {isCustomInput && (
        <Input
          type="text"
          placeholder="진단명 입력"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
        )}

        
      </Row>

        <Row>
          <Label>진단서(선택)</Label>
          <FileUpload>
            <input
              type="file"
              accept="image/*"
              id="diagnosis-upload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "diagnosis")}
            />
            {diagnosisImageUrl ? (
              <>
                <PreviewImage src={diagnosisImageUrl} alt="Diagnosis Preview" />
                <ReuploadText onClick={() => handleFileReupload("diagnosis")}>다시 선택하기</ReuploadText>
              </>
            ) : (
              <>
                <UploadIcon />
                <LabelForFile htmlFor="diagnosis-upload">
                  Drag your file(s) or <BrowseLink>browse</BrowseLink>
                </LabelForFile>
              </>
            )}
            <SmallText>Max 10 MB files are allowed</SmallText>
          </FileUpload>
        </Row>

        <Row>
          <Label>심전도(선택)</Label>
          <FileUpload>
            <input
              type="file"
              name="ecg_file"
              accept="application/json"
              id="ecg-upload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e, "ecg")}
            />
            {ecgImageUrl ? ( // Use ecgImageUrl here
    <>
      <PreviewImage src={ecgImageUrl} alt="ECG Preview" />
                <ReuploadText onClick={() => handleFileReupload("ecg")}>다시 선택하기</ReuploadText>
              </>
            ) : (
              <>
                <UploadIcon />
                <LabelForFile htmlFor="ecg-upload">
                  Drag your file(s) or <BrowseLink>browse</BrowseLink>
                </LabelForFile>
              </>
            )}
            <SmallText>Max 10 MB files are allowed</SmallText>
          </FileUpload>
        </Row>

        <Terms>
          <input 
            type="checkbox" 
            checked={acceptTerms} 
            onChange={() => setAcceptTerms(!acceptTerms)} 
          />
          <TermsText>회원정보 수정을 동의합니다.</TermsText>
        </Terms>

        {/* Move the error message right before the Submit button */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        
        <SubmitButton onClick={handleSubmit}>Continue</SubmitButton>
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
max-width: 800px;
margin: 0 auto;
padding: 30px;
background-color: #f4eae0;
box-sizing: border-box;
position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: center; /* Title을 가운데 정렬 */

  position: relative; /* PrevButton을 Header 내에서 위치시키기 위해 필요 */
  height: 60px; /* 필요에 따라 Header 높이 설정 */
  width: 100%;
  `;

const PrevButton = styled.button`
  position: absolute; /* Header를 기준으로 위치 조정 */
  left: 0; /* Header의 왼쪽 끝에 정렬 */
  font-size: 25px;
  color: #E87C6C;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin: 0;
`;



const Description = styled.p`
font-size: 14px;
color: #736f6b;
margin-bottom: 30px;
`;

const Form = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
margin-bottom: 50px;  // 여기에 여백 추가
`;

const Row = styled.div`
margin-bottom: 30px;
width: 100%;
`;

const Label = styled.label`
font-size: 15px;
color: #736f6b;
margin-bottom: 10px;
display: block;
text-align: left;
`;

const Input = styled.input`
width: 100%;
height: 50px;
border: 1px solid #ccc;
border-radius: 8px;
padding: 0 15px;
font-size: 16px;
`;

const Select = styled.select`
width: 100%;
height: 50px;
border: 1px solid #ccc;
border-radius: 8px;
padding: 0 15px;
font-size: 16px;
margin-bottom: 10px
`;

const GenderContainer = styled.div`
display: flex;
justify-content: flex-start;
gap: 10px;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
width: 48%;
height: 50px;
background-color: ${({ isSelected }) => (isSelected ? "#e87c6c70" : "#fff")};
border: 1px solid #ccc;
border-radius: 8px;
font-size: 16px;
cursor: pointer;

&:hover {
  background-color: #e87c6c70;
}
`;

const InputWithIcon = styled.div`
position: relative;
width: 100%;
`;

const SearchIcon = styled.span`
position: absolute;
right: 15px;
top: 50%;
transform: translateY(-50%);
cursor: pointer;
font-size: 20px;
`;

const FileUpload = styled.div`
border: 2px dashed #ccc;
border-radius: 8px;
padding: 20px;
font-size: 16px;
color: #999;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const LabelForFile = styled.label`
cursor: pointer;
display: block;
text-align: center;
`;

const BrowseLink = styled.span`
color: #e87c6c;
cursor: pointer;
font-weight: bold;
`;

const SmallText = styled.p`
font-size: 14px;
color: #999;
margin-top: 10px;
`;

const UploadIcon = styled(MdOutlineDriveFolderUpload)`
color: #BB3E2C;
font-size: 50px;
margin-bottom: 10px;
`;

const PreviewImage = styled.img`
max-width: 100%;
height: auto;
border-radius: 8px;
object-fit: contain;
max-height: 200px;
`;

const ReuploadText = styled.span`
margin-top: 10px;
color: #e87c6c;
cursor: pointer;
text-decoration: underline;

&:hover {
  color: #FFCE81;
}
`;

const Terms = styled.div`
display: flex;
align-items: center;
margin-bottom: 30px;
`;

const TermsText = styled.span`
font-size: 17px;
margin-left: 10px;
color: #999;
`;

const SubmitButton = styled.button`
background-color: #e87c6c;
color: white;
border: none;
border-radius: 8px;
height: 50px;
font-size: 18px;
cursor: pointer;
width: 100%;
margin-bottom: 30px;  // 여기에 여백 추가

&:hover {
  background-color: #e87c6c70;
}
`;


const ErrorMessage = styled.div`
color: #e87c6c;
font-size: 12px;
text-align: center;
margin: 0 auto; /* 좌우 마진을 자동으로 설정하여 div를 가운데 정렬 */
width: 80%; /* div의 너비를 설정 (필요에 따라 조정) */
max-width: 400px; /* 반응형을 위해 최대 너비 설정 */
margin-bottom: 20px;
`;

export default Edit;
