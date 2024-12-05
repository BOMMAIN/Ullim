import React, { useState, useRef, useEffect } from 'react';
import * as S from '../../components/ECGResults/style';
import { ChatService } from '../../api/chatServices';
import { ECGData } from 'types/chat';
import { v4 as uuidv4 } from 'uuid';
import { MedicalResponse } from '../../types/chat'

interface TabContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}
const chatService = new ChatService();
const userId = uuidv4(); // 컴포넌트 최상단에 추가

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  status?: 'error';
}

const tempECGData: ECGData = {
  pd: 110,
  pr: 160,
  qt: 380,
  qtc: 450,
  stSegment: "수평 또는 하향 경사진 ST 분절 하강"
};

const TabContainer = ({ activeTab, setActiveTab, children }: TabContainerProps) => (
  <S.TabWrapper>
    <S.TabHeader>
      <S.TabHeaderContent>
        <S.TabTitle>{activeTab === 'result' ? '결과 분석' : '울림 챗봇'}</S.TabTitle>
        <S.TabButtons>
          <S.TabButton $active={activeTab === 'result'} onClick={() => setActiveTab('result')}>
            결과 분석
          </S.TabButton>
          <S.TabButton $active={activeTab === 'chat'} onClick={() => setActiveTab('chat')}>
            AI 질문
          </S.TabButton>
        </S.TabButtons>
      </S.TabHeaderContent>
    </S.TabHeader>
    <S.ContentContainer>{children}</S.ContentContainer>
  </S.TabWrapper>
);

const AnalyzeECGResultPage = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_messages');
    return saved ? JSON.parse(saved) : [{
      id: '1',
      type: 'bot',
      content: '안녕하세요, 울림입니다. 궁금하신 부분에 대해 질문해주세요'
    }];
  });

  const formatBotMessage = (response: string) => {
    try {
      const parsed: MedicalResponse = JSON.parse(response);
      // Try advice first, then answer, then fall back to raw response
      return (
        <S.MessageContent>
          {parsed.advice || parsed.answer || response}
        </S.MessageContent>
      );
    } catch (e) {
      // If parsing fails, return the original response
      return <S.MessageContent>{response}</S.MessageContent>;
    }
  };

  const [ecgData, setECGData] = useState<ECGData>(tempECGData);
  const [activeTab, setActiveTab] = useState('result');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  // ECG 데이터를 가져오는 함수
  const fetchECGData = async () => {
    // 실제 API 호출로 대체할 수 있습니다.
    // const response = await fetch('/api/ecg-data');
    // const data = await response.json();
    // setECGData(data);

    // 임시로 tempECGData를 사용
    setECGData(tempECGData);
  };

  useEffect(() => {
    fetchECGData();
  }, []);

  // 채팅 이력 저장
  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  // 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputValue
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
  
    try {
      const response = await chatService.chat(userId, 'lifestyle', inputValue);
      const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
      console.log('Response:', response);
      
      let messageContent: string = '응답을 처리하는 중 오류가 발생했습니다.';

      if (parsedResponse?.answer) {
       messageContent = parsedResponse.answer;
      } else if (parsedResponse?.message) {
       messageContent = parsedResponse.message;
      } else if (typeof parsedResponse === 'object' && parsedResponse !== null) {
       const firstValue = Object.values(parsedResponse)[0];
       messageContent = firstValue?.toString() || messageContent;
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot' as const,
        content: messageContent.toString()
      };
  
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot' as const,
        content: '오류가 발생했습니다. 다시 시도해주세요.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

    const handleRetry = (messageId: string) => {
      const messageToRetry = messages.find(msg => msg.id === messageId);
      if (messageToRetry) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        setInputValue(messageToRetry.content);
      }
    };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>심전도 분석 결과 확인하기</S.HeaderTitle>
        <S.CloseButton>×</S.CloseButton>
      </S.Header>

      <S.Timestamp>2024.01.01 17:50</S.Timestamp>

      <S.ECGImages>
        <S.ECGGroup>
          <S.ECGImage src= "/images/ECG_example.png" />
        </S.ECGGroup>
      </S.ECGImages>

      <S.HeaderTitle>분석 결과</S.HeaderTitle>

      <S.ECGImages>
        <S.ECGGroup>
          <S.ECGLinedImage src="/images/ECG_point.png" />
        </S.ECGGroup>
      </S.ECGImages>

      <S.MetricsTable>
        <tbody>
          <tr>
            <S.MetricCell>Pd</S.MetricCell>
            <S.MetricCell>{ecgData.pd}ms</S.MetricCell>
          </tr>
          <tr>
            <S.MetricCell>PR</S.MetricCell>
            <S.MetricCell>{ecgData.pr}ms</S.MetricCell>
          </tr>
          <tr>
            <S.MetricCell>QT</S.MetricCell>
            <S.MetricCell>{ecgData.qt}ms</S.MetricCell>
          </tr>
          <tr>
            <S.MetricCell>QTc</S.MetricCell>
            <S.MetricCell>{ecgData.qtc}ms</S.MetricCell>
          </tr>
        </tbody>
      </S.MetricsTable>

      <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'result' ? (
          <S.ResultSection>
            <S.ResultItem>
              <S.HeartIcon>❤️</S.HeartIcon>
              <S.ResultText>QTc가 {ecgData.qtc}ms로 높은 수치입니다.</S.ResultText>
            </S.ResultItem>
            <S.AnalysisText>
              심전도 검사에서 "ST 분절"이 {ecgData.stSegment}이(가) 발견되었습니다.<br></br>
              이는 심장 근육에 충분한 산소가 공급되지 않고 있음을 의미할 수 있습니다.<br></br>
              심장이 피를 제대로 받지 못해서 힘들어하고 있을 가능성이 있습니다.
            </S.AnalysisText>
          </S.ResultSection>
  ) : (
    <S.ChatContainer>
      <S.ChatMessages>
        {messages.map(message => (
          <React.Fragment key={message.id}>
            {message.type === 'bot' ? (
              <S.BotMessageWrapper>
              <S.IconNameColumn>
                <S.BotIcon />
                <S.BotName>울림</S.BotName>
              </S.IconNameColumn>
              <S.BotMessage>
                {/* <S.MessageContent> */}
                  {formatBotMessage(message.content)}
                {/* </S.MessageContent> */}
              </S.BotMessage>
            </S.BotMessageWrapper>

            ) : (
              <S.UserMessage>
                <S.MessageContent>
                  {message.content}
                  {message.status === 'error' && (
                    <S.RetryButton onClick={() => handleRetry(message.id)}>
                      재시도
                    </S.RetryButton>
                  )}
                </S.MessageContent>
              </S.UserMessage>
            )}
          </React.Fragment>
        ))}
        {isTyping && (
          <S.BotMessage>
            <S.BotIcon />
            <S.TypingIndicator>
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </S.TypingIndicator>
          </S.BotMessage>
        )}
        <div ref={messagesEndRef} />
      </S.ChatMessages>
      <S.ChatInput>
        <S.Input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isLoading ? "메시지 전송중..." : "심전도에 대한 질문이 있나요?"}
          disabled={isLoading}
        />
        <S.SendButton 
          onClick={() => handleSendMessage()}
          disabled={isLoading}
        >
          {isLoading ? "..." : "➤"}
        </S.SendButton>
      </S.ChatInput>
    </S.ChatContainer>
  )}
</TabContainer>
    </S.Container>
  );
};

export default AnalyzeECGResultPage;