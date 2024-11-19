import '../../index.css';
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <Logocontainer>
        <LogoImg
          src="/images/울림로고.png"
          alt="로고"
        />
        <Description>심장질환 커뮤니티</Description>
        <Title>울림</Title>
      </Logocontainer>
      <KakaoButton>
        <KakaoImg
          src="/images/카카오로그인.png"
          alt="카카오 로그인 버튼"
        />
      </KakaoButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #F4EAE0;
  box-sizing: border-box;
`;

const Logocontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const LogoImg = styled.img`
  width: 100px;
  margin-bottom: 20px;
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

const KakaoButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7; /* 버튼을 호버했을 때 약간 어두워지는 효과 */
  }
`;

const KakaoImg = styled.img`
  width: 370px;
`;

export default Login;
