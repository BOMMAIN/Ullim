import '../../index.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@routes/path';
import { useState } from 'react';


const Login = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // 아이디와 비밀번호 검사
    if (id === 'bomain' && password === '1234') {
      navigate(RouterPath.communityPage);
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignUp = () => {
    // 회원가입 처리 로직
    navigate(RouterPath.signup)
  };

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
      <Form>
        {/* 아이디 입력 */}
        <Input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        {/* 비밀번호 입력 */}
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 에러 메시지 출력 */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* 로그인 버튼 */}
        <LoginButton onClick={handleLogin}>로그인</LoginButton>

        {/* 회원가입 섹션 */}
        <SignUpContainer>
          <Description2>울림이 처음이신가요?</Description2>
          <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>
        </SignUpContainer>
      </Form>
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #555;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #E87C6C;
  border-radius: 25px; /* 둥근 모서리 설정 */
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px; /* 회원가입 버튼과의 간격 */

  &:hover {
    background-color: #e87c6c70;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: #E87C6C;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const Description2 = styled.div`
  font-size: 13px;
  color: #736f6b;
  margin-top: 10px;
`;

const SignUpContainer = styled.div``;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export default Login;
