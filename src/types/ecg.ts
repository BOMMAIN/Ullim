export interface ECGAnalysisResponse {
    results: string[];
  }
  
  export interface ECGDetailedAnalysis {
    analysis: {
      qtcAnalysis: string;
      stSegmentAnalysis: string;
      implications: string[];
      diagnoses: string[];
    }
  }
  
  export interface ECGRecord {
    id: string;
    timestamp: string;
    analysisResults: string[];  // AI 모델의 진단 결과 배열
    gptAnalysis: {
      qtcAnalysis: string;
      stSegmentAnalysis: string;
      implications: string[];
    };
    messages: Message[];
    activeTab: string;
  }
  
  export interface ECGData {
    pd: number;
    pr: number;
    qt: number;
    qtc: number;
    stSegment: string;
  }
  
  export interface Message {
    id: string;
    type: 'bot' | 'user';
    content: string;
    status?: 'error';
  }