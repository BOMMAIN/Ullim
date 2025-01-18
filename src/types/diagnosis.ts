// types/diagnosis.ts
export interface DiagnosisData {
  mainDisease?: string;
  subDisease?: string;
  treatment: string;
  opinion: string;
  diagnosisDate: string;
  summary: string[];  // 문자열 배열로 타입 명시
}
export interface DiagnosisRecord {
  id: string;
  timestamp: string;
  imageUrl?: string;    // 원본 URL (저장 전용)
  imageData?: string;   // Base64 변환된 이미지 데이터
  data: {
    mainDisease?: string;
    subDisease?: string;
    treatment?: string;
    opinion?: string;
    diagnosisDate?: string;
    summary: string[];
  };
}