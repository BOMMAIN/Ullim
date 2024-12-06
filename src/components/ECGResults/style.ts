import styled from 'styled-components';

export const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background-color: #F4EAE0;
  min-height: 100vh;
`;

export const MessageContent = styled.div`
  padding: 12px;
  border-radius: 12px;
  background-color: #F4F0EF;
  max-width: 80%;
  word-break: break-word;
  text-align: left;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d45e5e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

export const Timestamp = styled.div`
  text-align: center;
  color: #666;
  padding: 8px;
`;

export const ECGImages = styled.div`
  padding: 16px;
`;

export const ECGGroup = styled.div`
  margin-bottom: 16px;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const ECGImage = styled.img`
  height: 324px;
  justify-content: center;
  background-color: white;
  border: 1px solid #eee;
`;

export const ButtonGroupOutside = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
  margin-left: 48px; // BotIcon width + margin
`;

export const ECGLinedImage = styled.img`
  height: 120px;
  display: flex;
  justify-content: center;
  background-color: white;
  border: 1px solid #eee;
`;

export const MetricsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  margin-bottom: 16px;
`;

export const MetricCell = styled.td`
  padding: 8px;
  border: 1px solid #ffe5e5;
  text-align: center;

  &:first-child {
    color: #d45e5e;
    font-weight: 500;
  }
`;

export const TabWrapper = styled.div`
  margin-top: 16px;
`;

export const TabHeader = styled.div`
  padding: 0 16px;
`;

export const TabHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #d45e5e;
  margin: 0;
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: none;
  background-color: ${props => (props.$active ? '#d45e5e' : 'transparent')};
  color: ${props => (props.$active ? 'white' : '#666')};
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => (props.$active ? '#d45e5e' : '#ffe5e5')};
  }
`;

export const ContentContainer = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ResultSection = styled.div`
  border: 1px solid #ffe5e5;
  border-radius: 8px;
  padding: 16px;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const HeartIcon = styled.span`
  margin-right: 8px;
`;

export const ResultText = styled.p`
  margin: 0;
`;

export const AnalysisText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

export const UserMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;

  ${MessageContent} {
    background-color: #FBEDEB;
    color: black;
    border-bottom-right-radius: 0;
  }
`;

export const BotIcon = styled.div`
  width: 32px;
  height: 32px;
  padding: 3px;
  border-radius: 50%;
  border: 2px solid #979797;
  margin-left: 8px;
  background-image: url('/images/bot_icon.png'); /* public 폴더 기준 경로 */
  background-size: 70%; /* 배경 이미지 크기 줄이기 */
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box; /* 테두리와 패딩을 포함한 크기 */
`;



export const BotMessageWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;  // margin-bottom을 여기로 이동
`;

export const ChatInput = styled.div`
  display: flex;
  padding: 16px;
  gap: 8px;
  border-top: 1px solid #eee;
`;

export const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d45e5e;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const RetryButton = styled.button`
  font-size: 12px;
  padding: 4px 8px;
  margin-left: 8px;
  border: none;
  background-color: #ff4444;
  color: white;
  border-radius: 12px;
  cursor: pointer;
`;

export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px;
  background-color: #f8e5e5;
  border-radius: 12px;
  border-top-left-radius: 0;

  span {
    width: 6px;
    height: 6px;
    background: #d45e5e;
    border-radius: 50%;
    animation: typing 1.4s infinite;
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }

  @keyframes typing {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
`;

export const AnalysisBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const AnalysisTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  color: #333;
`;

export const RecommendationText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 12px;
`;

export const ComparisonText = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
`;

export const MetricItem = styled.div`
  text-align: center;
`;

export const MetricLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const MetricValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff4444;
`;

export const Question = styled.p`
  font-size: 16px;
  margin: 16px 0;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const RoundedButton = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.$primary ? '#FF6B6B' : '#FFE5E5'};
  color: ${props => props.$primary ? 'white' : '#FF6B6B'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ContainerForChatPage = styled.div`
 display: flex;
 flex-direction: column;
 height: 100%;
 position: relative;
 overflow: hidden;
 background-color: #FFFCFC;
 margin: -24px;
 margin-bottom: -100px; // 하단 여백 제거
 padding: 24px;
 padding-bottom: 100px; // 원래 간격 유지
`;

export const HeaderForChatPage = styled.header`
 padding: 16px;
 background: white;
 border-bottom: 1px solid #eee;
 position: sticky;
 top: 0;
 z-index: 10;
`;

export const ChatContainerForChatPage = styled.div`
 flex: 1;
 overflow-y: auto;
 padding-bottom: 80px;
`;

export const ChatInputForChatPage = styled.div`
 display: flex;
 gap: 8px;
 padding: 16px;
 background: white;
 border-top: 1px solid #eee;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 z-index: 10;
`;

export const BotMessage = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  gap: 12px;

  ${MessageContent} {
    border-top-left-radius: 0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  margin-top: 4px;
`;

export const IconNameColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  gap: 4px;
  margin-top: 4px;
`;

export const BotName = styled.span`
  font-size: 12px;
  color: #4A4A4A;
  text-align: center;
`;

export const MessageColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 20px;
  outline: none;

  &::placeholder {
    color: #999;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    
    &::placeholder {
      color: #666;
    }
  }
`;

// components/ECGResults/style.ts에 추가
export const DiagnosisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;