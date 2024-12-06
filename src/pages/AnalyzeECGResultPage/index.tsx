import React, { useState, useRef, useEffect } from 'react';
import * as S from '../../components/ECGResults/style';
import { ChatService } from '../../api/chatServices';
import { ECGData } from 'types/chat';
import { ECGRecord } from 'types/ecg';
import { v4 as uuidv4 } from 'uuid';
import { MedicalResponse } from '../../types/chat';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveECGRecord } from '../../utils/ecgStorage';

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
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    aiResults, 
    analysisResult,
    isFromSignup,
    signupData 
  } = location.state || {};

  const sessionId = useRef(uuidv4()).current;

  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: '안녕하세요, 울림입니다. 궁금하신 부분에 대해 질문해주세요'
  }]);

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

  const [activeTab, setActiveTab] = useState('result');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

    // X 버튼 클릭 핸들러
const handleClose = () => {
  const record = {
    id: sessionId,
    timestamp: new Date().toISOString(),
    analysisResults: aiResults,
    gptAnalysis: analysisResult.analysis,
    messages,
    activeTab,
    ecgFile: location.state.signupData?.ecgFile  // 파일 포함
  };
  
  saveECGRecord(record);
  
  if (isFromSignup) {
    navigate('/signup', { 
      state: { 
        signupData: { ...signupData }, 
        ecgAnalyzed: true,
        ecgResult: record,
        ecgFile: location.state.signupData?.ecgFile  // 파일도 함께 전달
      } 
    });
  } else {
    navigate('/records');
  }
};
  
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
      type: 'user',
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
          <S.CloseButton onClick={handleClose}>×</S.CloseButton>
        </S.Header>
  
        <S.Timestamp>{new Date().toLocaleString()}</S.Timestamp>
  
        <S.ECGImages>
          <S.ECGGroup>
            <S.ECGImage src="/images/ECG_example.png" />
          </S.ECGGroup>
        </S.ECGImages>
  
        <S.HeaderTitle>분석 결과</S.HeaderTitle>
  
        <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === 'result' ? (
            <S.ResultSection>
  {/* 요약 및 주요 발견사항 */}
  <S.ResultItem>
    <S.HeartIcon>❤️</S.HeartIcon>
    <S.ResultText>
      {analysisResult?.analysis?.summary || "분석 결과를 불러올 수 없습니다."}
    </S.ResultText>
  </S.ResultItem>

  {/* 진단 목록 */}
  <S.DiagnosisList>
  {analysisResult?.analysis?.mainFindings && (
    <div>{analysisResult.analysis.mainFindings}</div>
  )}
  </S.DiagnosisList>

  {/* 의미하는 바와 권장사항 */}
  <S.AnalysisText>
    {analysisResult?.analysis?.implications?.map((implication: string, index: number) => (
      <React.Fragment key={index}>
        <br />• {implication}
      </React.Fragment>
    ))}
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