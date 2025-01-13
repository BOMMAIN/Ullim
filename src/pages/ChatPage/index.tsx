import React, { useState, useRef, useEffect } from 'react';
import * as S from '../../components/ECGResults/style';
import { ChatService } from '../../api/chatServices';
import {ExerciseAnalysis, ExerciseMetrics} from '../../components/ECGResults/ExerciseAnalysis';
import DietAnalysis from '../../components/ECGResults/DietAnalysis';
import { v4 as uuidv4 } from 'uuid';
import Menubar from "@components/features/Menubar";

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
    id: string;
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
    id: string;
    type: 'exercise';
    content: string;
    exercises: Exercise;
    metrics: ExerciseMetrics;
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
   
    if (inputValue.includes('운동 추천') || inputValue.includes('식단 추천')) {
      const type = inputValue.includes('운동 추천') ? 'exercise' : 'diet';
      handleRecommendationClick(type);
      return;
    }
   
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputValue
    }]);
    setInputValue('');
    setIsLoading(true);
   
    try {
      const response = await chatService.chat(userId, 'lifestyle', inputValue);
      try {
        const parsedResponse = JSON.parse(response);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot' as const,
          content: parsedResponse.content || parsedResponse.answer || response
        } as Message]);
      } catch {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot' as const,
          content: response
        } as Message]);
      }
     } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot' as const,
        content: '오류가 발생했습니다. 다시 시도해주세요.'
      } as Message]);
     } finally {
      setIsLoading(false);
      setIsTyping(false);
     }
   };

  const handleRecommendationClick = async (type: 'diet' | 'exercise') => {
    try {
      setInputValue('');
      const userMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `${type === 'diet' ? '식단' : '운동'} 추천해주세요`
      };
  
      setIsLoading(true);
      setIsTyping(true);
      setMessages(prev => [...prev.map(msg => ({
        ...msg,
        showInitialButtons: false,
        type: msg.type as 'bot' | 'user', // 타입 명시
       }) as Message), {
        ...userMessage,
        type: 'user' as const // 리터럴 타입으로 지정
       } as Message]);
  
      const response = await chatService.chat(userId, 'lifestyle', userMessage.content);
      console.log('Raw chatbot response:', response);
      const parsedResponse = JSON.parse(response);
      console.log('Parsed chatbot response:', parsedResponse);
  
      const messageId = Date.now().toString();

      // 조건부로 recommendation 객체 생성
      const recommendation = type === 'diet' ? {
       id: messageId,
       type: 'diet' as const,
       content: parsedResponse.content,
       recommendations: parsedResponse.recommendations,
       nutritionGuidelines: parsedResponse.nutritionGuidelines
      } : {
       id: messageId,
       type: 'exercise' as const,
       content: parsedResponse.content,
       exercises: parsedResponse.exercises,
       metrics: parsedResponse.metrics
      };
      
      const botMessage: MessageWithRecommendation = {
       id: messageId,
       type: 'bot',
       content: parsedResponse.content,
       recommendation
      };

      console.log('Bot message being created:', botMessage);
  
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
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
  

   function isMessageWithRecommendation(message: Message): message is MessageWithRecommendation {
    return 'recommendation' in message;
   }
   
   const handleRegister = async (recommendation?: DietRecommendation | ExerciseRecommendation) => {
    if (!recommendation) return;
    console.log('Full recommendation object:', recommendation);
    console.log('Message with this recommendation:', messages.find(msg => 
      isMessageWithRecommendation(msg) && 
      msg.recommendation?.id === recommendation.id
    ));
    // 로컬 스토리지 저장 
    const key = recommendation.type === 'diet' ? 'diet_recommendations' : 'exercise_recommendations';
    const existingData = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([...existingData, {
      ...recommendation,
      timestamp: new Date().toISOString()
    }]));
   
    console.log('Registering recommendation:', {
      type: recommendation.type,
      id: recommendation.id,
      content: recommendation.content
    });
  
    setMessages(prev => {
      const updatedMessages = prev.map(msg => {
        if (isMessageWithRecommendation(msg)) {
          console.log('Comparing message:', {
            type: msg.recommendation?.type,
            id: msg.recommendation?.id,
            content: msg.recommendation?.content,
            matches: msg.recommendation?.type === recommendation.type
          });
        }
        return isMessageWithRecommendation(msg) && msg.recommendation?.type === recommendation.type
          ? { ...msg, showResponseButtons: false }
          : msg;
      });
      return updatedMessages;
    });
   
    const userMessage: BaseMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: '등록할래요'
    };
   
    setMessages(prev => [...prev, userMessage]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const botMessage: BaseMessage = {
      id: Date.now().toString() + 1,
      type: 'bot' as const,
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
        type: 'bot' as const,
        content: recommendation.type === 'diet' ?
          '운동 추천도 받아보시겠어요?' :
          '식단 추천도 받아보시겠어요?',
        showInitialButtons: true
      };
      
      setMessages(prev => [...prev, suggestMessage]);
    }
   
    setInputValue('');
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
                        console.log('Message recommendation data:', message.recommendation),
                      <ExerciseAnalysis
                        metrics={message.recommendation.metrics}
                        recommendation={message.recommendation}
                        onRegister={() => handleRegister(message.recommendation)}
                        showRegisterButton={message.showResponseButtons !== false}
                      />
                        ) : (
                          <DietAnalysis
                            recommendations={message.recommendation.recommendations}
                            nutritionGuidelines={message.recommendation.nutritionGuidelines}
                            onRegister={() => handleRegister(message.recommendation)}
                            showRegisterButton={message.showResponseButtons !== false}
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

      <Menubar/>
    </S.ContainerForChatPage>
    
  );
  
};

export default ChatPage;