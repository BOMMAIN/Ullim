import '../../index.css';
import styled from "styled-components";


const Login = () => {
  return (
    <Container>
      <Logocontainer>
        <LogoImg
          src="https://cdn-icons-png.flaticon.com/512/138/138533.png"
          alt="로고"
        />
        <Description>심장질환 커뮤니티</Description>
        <Title>울림</Title>
      </Logocontainer>
      <KakaoImg
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOTxPc8jpLjbc8VICtkjJy2VTAL8eEI9SRqA&s"
        alt="카카오로그인이미지"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Container 내 콘텐츠 수직 정렬 */
  align-items: center; /* Container 내 콘텐츠 수평 정렬 */
  height: 100vh;
  width: 100%;
  max-width: 800px; /* 최대 너비 */
  margin: 0 auto;
  padding: 30px;
  background-color: #F4EAE0;
  box-sizing: border-box;
`;

const Logocontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Logocontainer 내부 수직 중앙 정렬 */
  align-items: center; /* Logocontainer 내부 수평 중앙 정렬 */
  margin-bottom: 50px; /* 아래 KakaoImg와 간격 조정 */
`;

const LogoImg = styled.img`
  width: 100px;
  margin-bottom: 20px; /* Title과 간격 추가 */
`;

const Description = styled.p`
  font-size: 18px;
  color: #736f6b;
  margin-top: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const KakaoImg = styled.img`
  width: 200px;
  border-radius: 10%; /* 모서리 둥글게 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 설정 */
`;

export default Login;
