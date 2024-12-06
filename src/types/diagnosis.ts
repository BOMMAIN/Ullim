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
    imageUrl: string;
    data: DiagnosisData;
    analysisDate: string;
  }