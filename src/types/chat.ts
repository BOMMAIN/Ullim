// ECG 데이터 인터페이스
export interface ECGData {
  pd: number;
  pr: number;
  qt: number;
  qtc: number;
  stSegment: string;
}

// 채팅 메시지 인터페이스
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// 채팅 히스토리 인터페이스
export interface ChatHistory {
  userId: string;
  ecgData?: ECGData;
  messages: {
    analysis: ChatMessage[];
    medical: ChatMessage[]; 
    lifestyle: ChatMessage[];
  }
}

export type RecommendationType = 'diet' | 'exercise' | null;

export interface Metrics {
  bloodPressure: number;
  bloodSugar: number;
  weight: number;
  bodyFat: number;
}

export interface RecommendationResponse {
  type: RecommendationType;
  content: string;
  metrics: {
    bloodPressure: number;
    bloodSugar: number;
    weight: number;
    bodyFat: number;
  };
}

// Message 인터페이스 수정
export interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  status?: 'error';
  showInitialButtons?: boolean;
  showResponseButtons?: boolean;
  recommendation?: RecommendationResponse;
}

export interface ExerciseRecommendation {
  type: 'exercise';
  exercises: {
    name: string;
    intensity: '상' | '중' | '하';
    duration: number;
    repetitions: number;
    frequency: number;
    period: number;
    caution: string;
  }[];
  metrics: {
    bloodPressure: number;
    bloodSugar: number;
    weight: number;
    bodyFat: number;
  };
}

// 식단 추천 타입
export interface DietRecommendation {
  type: 'diet';
  recommendations: {
    food: string;
    reason: string;
    nutrients: {
      name: string;
      benefit: string;
    }[];
  }[];
  nutritionGuidelines: {
    increase: string[];
    decrease: string[];
  };
  metrics: {
    bloodPressure: number;
    bloodSugar: number;
    weight: number;
    bodyFat: number;
  };
}

// Make answer optional since it might not always be present
export interface MedicalResponse {
  pd?: number;
  pr?: number;
  qt?: number;
  qtc?: number;
  stSegment?: string;
  advice?: string;
  answer?: string;  // Changed to optional
}

// 파일을 모듈로 만들기 위한 빈 export
export {};