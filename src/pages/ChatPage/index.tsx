import React, { useState, useRef, useEffect } from 'react';
import * as S from '../../components/ECGResults/style';
import { ChatService } from '../../api/chatServices';
import ExerciseAnalysis from '../../components/ECGResults/ExerciseAnalysis';
import DietAnalysis from '../../components/ECGResults/DietAnalysis';
import { v4 as uuidv4 } from 'uuid';

interface BaseMessage {
    id: string;
    type: 'user' | 'bot';
    content: string;
    showInitialButtons?: boolean;
    showResponseButtons?: boolean;
  }
  
  interface Exercise {
    name: string;
    intensity: string;
    duration: string;
    repetitions: string;
    frequency: string;
    period: string;
    caution: string;
  }
  
  interface DietRecommendation {
    type: 'diet';
    content: string;
    recommendations: Array<{
      food: string;
      reason: string;
      nutrients: Array<{
        name: string;
        benefit: string;
      }>;
    }>;
    nutritionGuidelines: {
      increase: string[];
      decrease: string[];
    };
  }
  
  interface ExerciseRecommendation {
    type: 'exercise';
    content: string;
    exercises: Exercise[];
    metrics: {
      bloodSugar: number;
      bloodPressure: number;
      weight: number;
      bodyWeightKg: number;
    };
   }
  
  interface MessageWithRecommendation extends BaseMessage {
    recommendation?: DietRecommendation | ExerciseRecommendation;
   }
   
   type Message = BaseMessage | MessageWithRecommendation;

   function isMessageWithRecommendation(message: Message): message is MessageWithRecommendation {
    return 'recommendation' in message;
   }

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('lifestyle_chat_messages');
    return saved ? JSON.parse(saved) : [{
      id: '1',
      type: 'bot',
      content: '안녕하세요. 울림입니다. 추천받고 싶은 부분을 클릭해주세요.',
      showInitialButtons: true
    }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = new ChatService();
  const userId = uuidv4();

  useEffect(() => {
    localStorage.setItem('lifestyle_chat_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
  
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    }]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
  
    try {
      console.log('Request:', { userId, type: 'lifestyle', message: inputValue });
      const response = await chatService.chat(userId, 'lifestyle', inputValue);
      const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
      const messageContent = parsedResponse.message || 
                            (typeof parsedResponse === 'object' ? Object.values(parsedResponse)[0] : parsedResponse);
  
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: messageContent.toString()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: '오류가 발생했습니다. 다시 시도해주세요.'
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleRecommendationClick = async (type: 'diet' | 'exercise') => {
    try {
      const userMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `${type === 'diet' ? '식단' : '운동'} 추천해주세요`
      };
  
      setIsLoading(true);
      setIsTyping(true);
  
      // 1. 유저 메시지를 먼저 추가
      setMessages(prev => [
        ...prev.map(msg => ({
          ...msg,
          showInitialButtons: false
        }) as Message),
        userMessage as Message
      ]);
  
      // 2. 봇 응답 대기 (3초)
      await new Promise(resolve => setTimeout(resolve, 3000));
  
      const botMessage: MessageWithRecommendation = {
        id: Date.now().toString() + 1,
        type: 'bot',
        content: type === 'diet' ? 
          '미역국을 추천해드려요.\n당뇨, 고혈압, 고지혈증 같은 대사 질환을 관리할 수 있는 식단입니다.' : 
          '하루 10분 정도 가벼운 운동을 추천해요.',
        recommendation: type === 'diet' ? {
          type: 'diet',
          content: '식단 추천',
          recommendations: [{
            food: '미역국',
            reason: '당뇨, 고혈압, 고지혈증 같은 대사 질환을 관리할 수 있는 식단입니다',
            nutrients: [{ name: '식이섬유', benefit: '혈당 조절에 도움' }]
          }],
          nutritionGuidelines: {
            increase: ['식이섬유'],
            decrease: ['포화지방 비율']
          }
        } : {
          type: 'exercise',
          content: '운동 추천',
          exercises: [{
            name: '걷기',
            intensity: '중',
            duration: '30분',
            repetitions: 'N/A',
            frequency: '매일',
            period: '4주',
            caution: '천천히 시작하세요'
          }],
          metrics: {
            bloodSugar: -15,
            bloodPressure: -10,
            weight: -3,
            bodyWeightKg: -2
          }
        }
      };
  
      // 3. 봇 메시지를 추가
      setMessages(prev => [
        ...prev,
        botMessage as Message
      ]);
    } catch (error) {
      console.error('파싱 에러:', error);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };
  

   function isMessageWithRecommendation(message: Message): message is MessageWithRecommendation {
    return 'recommendation' in message;
   }
   
   const handleRegister = async (recommendation?: DietRecommendation | ExerciseRecommendation) => {
    if (!recommendation) return;
  
    const userMessage: BaseMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: '등록할래요'
    };
  
    setMessages(prev => [...prev, userMessage]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const botMessage: BaseMessage = {
      id: Date.now().toString() + 1,
      type: 'bot',
      content: '등록이 완료되었습니다. 기록 탭에서 확인할 수 있습니다.'
    };
  
    const hasOtherTypeRecommendation = messages.some(msg => 
      isMessageWithRecommendation(msg) && 
      msg.recommendation?.type !== recommendation.type
    );
  
    setMessages(prev => [...prev, botMessage]);
    
    if (!hasOtherTypeRecommendation) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const suggestMessage: BaseMessage = {
        id: Date.now().toString() + 2,
        type: 'bot',
        content: recommendation.type === 'diet' ?
          '운동 추천도 받아보시겠어요?' :
          '식단 추천도 받아보시겠어요?',
        showInitialButtons: true
      };
      
      setMessages(prev => [...prev, suggestMessage]);
    }
  };

   return (
    <S.ContainerForChatPage>
      <S.HeaderForChatPage>
        <S.HeaderTitle>울림 챗봇</S.HeaderTitle>
      </S.HeaderForChatPage>
  
      <S.ChatContainerForChatPage>
        <S.ChatMessages>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              {message.type === 'bot' ? (
                <S.BotMessage>
                  <div className="flex flex-col items-start">
                    <S.BotIcon />
                    <S.BotName>울림</S.BotName>
                  </div>
                  <div className="flex flex-col">
                    <S.MessageContent>
                      {message.content}
                      {isMessageWithRecommendation(message) && message.recommendation && (
                        message.recommendation.type === 'exercise' ? (
                          <ExerciseAnalysis
                            metrics={message.recommendation.metrics}
                            onRegister={() => handleRegister(message.recommendation)}
                          />
                        ) : (
                          <DietAnalysis
                            recommendations={message.recommendation.recommendations}
                            nutritionGuidelines={message.recommendation.nutritionGuidelines}
                            onRegister={() => handleRegister(message.recommendation)}
                          />
                        )
                      )}
                    </S.MessageContent>
                    {message.showInitialButtons && (
                      <S.ButtonGroupOutside>
                        {(!messages.some(msg => 
                          isMessageWithRecommendation(msg) && msg.recommendation?.type === 'diet'
                        )) && (
                          <S.RoundedButton onClick={() => handleRecommendationClick('diet')} disabled={isLoading}>
                            식단
                          </S.RoundedButton>
                        )}
                        {(!messages.some(msg => 
                          isMessageWithRecommendation(msg) && msg.recommendation?.type === 'exercise'
                        )) && (
                          <S.RoundedButton onClick={() => handleRecommendationClick('exercise')} disabled={isLoading}>
                            추천활동
                          </S.RoundedButton>
                        )}
                      </S.ButtonGroupOutside>
                    )}
                  </div>
                </S.BotMessage>
              ) : (
                <S.UserMessage>
                  <S.MessageContent>{message.content}</S.MessageContent>
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
  
        <S.ChatInputForChatPage>
          <S.Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isLoading ? '메시지 전송중...' : '생활 습관에 대해 질문해주세요.'}
            disabled={isLoading}
          />
          <S.SendButton onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? '...' : '➤'}
          </S.SendButton>
        </S.ChatInputForChatPage>
      </S.ChatContainerForChatPage>
    </S.ContainerForChatPage>
  );
  
};

export default ChatPage;