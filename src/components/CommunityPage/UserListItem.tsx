import styled from "styled-components";

import { FaUserAlt } from "react-icons/fa";

const UserListItem = () => {
  return (
    <Container>
      <FaUserAlt size={80} />
      <Name>심정호</Name>
      <Des>
        닉네임님의 상황과 55% <br />
        비슷해요!
      </Des>
    </Container>
  );
};

export default UserListItem;

const Container = styled.div`
  width: 80%;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.47);
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Des = styled.span`
  font-size: 10px;
  color: #4a9efd;
  margin-top: 20px;
`;
