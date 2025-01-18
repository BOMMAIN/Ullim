// ECGRecordPage.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../index.css';
import * as S from '../../components/ECGResults/style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdNavigateBefore } from "react-icons/md";
import { getECGRecords } from '../../utils/ecgStorage';
import { ECGRecord } from '../../types/ecg';
  
interface TabContainerProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    children: React.ReactNode;
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

  const  ECGRecordPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // URL의 id 파라미터 가져오기
    const [activeTab, setActiveTab] = useState('result');
    const [record, setRecord] = useState<ECGRecord | undefined>(undefined);
  
    const goBack = () => {
      navigate(-1);
    };
  
    // URL의 id를 이용해 해당 기록 찾기
    useEffect(() => {
      const fetchRecord = async () => {
        const records = await getECGRecords();
        const foundRecord = records.find(r => r.id === id);
        setRecord(foundRecord);
      };
  
      fetchRecord();
    }, [id]);

    if (!record) {
        return (
          <S.Container>
            <S.Header>
              <PrevButton onClick={goBack}>
                <MdNavigateBefore />
              </PrevButton>
              <Title>기록을 찾을 수 없습니다</Title>
            </S.Header>
          </S.Container>
        );
      }
    
    return (
      <S.Container>
      <S.Header>
        <PrevButton onClick={goBack}>
          <MdNavigateBefore />
        </PrevButton>
        <Title>심전도 분석 결과</Title>
      </S.Header>

      <S.Timestamp>{new Date(record.timestamp).toLocaleString()}</S.Timestamp>

      <S.ECGImages>
        <S.ECGGroup>
          {/* {record.ecgFile && (
            <S.ECGImage src={URL.createObjectURL(record.ecgFile)} alt="ECG Result" />
          )} */}
          <S.ECGImage src="/images/ECG_example.png" alt="ECG Example" />
        </S.ECGGroup>
      </S.ECGImages>
        
        <TabContainer activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === 'result' ? (
             <S.ResultSection>
             <S.ResultItem>
               <S.HeartIcon>❤️</S.HeartIcon>
               <S.ResultText>
                 {record.analysisResults?.summary || "분석 결과를 불러올 수 없습니다."}
               </S.ResultText>
             </S.ResultItem>

             <S.DiagnosisList>
               {record.gptAnalysis?.mainFindings && (
                 <div>{record.gptAnalysis.mainFindings}</div>
               )}
             </S.DiagnosisList>

             <S.AnalysisText>
               {record.gptAnalysis?.implications?.map((implication: string, index: number) => (
                 <React.Fragment key={index}>
                   <br />• {implication}
                 </React.Fragment>
               ))}
             </S.AnalysisText>
           </S.ResultSection>
          ) : (
            <S.ChatContainer>
              <S.ChatMessages>
                {record.messages.map((message: any) => (
                  <React.Fragment key={message.id}>
                    {message.type === 'bot' ? (
                      <S.BotMessageWrapper>
                        <S.IconNameColumn>
                          <S.BotIcon />
                          <S.BotName>울림</S.BotName>
                        </S.IconNameColumn>
                        <S.BotMessage>
                          <S.MessageContent>{message.content}</S.MessageContent>
                        </S.BotMessage>
                      </S.BotMessageWrapper>
                    ) : (
                      <S.UserMessage>
                        <S.MessageContent>{message.content}</S.MessageContent>
                      </S.UserMessage>
                    )}
                  </React.Fragment>
                ))}
              </S.ChatMessages>
            </S.ChatContainer>
          )}
        </TabContainer>
      </S.Container>
    );
  };
  const PrevButton = styled.button`
  position: absolute;
  left: 0;
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
export default ECGRecordPage;