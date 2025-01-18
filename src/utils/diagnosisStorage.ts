import { DiagnosisRecord } from '../types/diagnosis';

const STORAGE_KEY = 'diagnosis_records';

// utils/diagnosisStorage.ts
export const saveDiagnosisRecord = async (record: DiagnosisRecord) => {
  let recordToSave = { ...record };

  // 이미지 URL을 Base64로 변환
  if (record.imageUrl) {
    try {
      // Blob URL인 경우 fetch로 데이터를 가져옴
      const response = await fetch(record.imageUrl);
      const blob = await response.blob();
      
      // Blob을 Base64로 변환
      const reader = new FileReader();
      const base64String = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      
      recordToSave.imageData = base64String;  // Base64 데이터 저장
      delete recordToSave.imageUrl;  // URL 제거
    } catch (error) {
      console.error('이미지 변환 중 오류:', error);
    }
  }

  const records = getDiagnosisRecords();
  records.unshift(recordToSave);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return recordToSave.id;
};

export const getDiagnosisRecords = (): DiagnosisRecord[] => {
  const records = localStorage.getItem(STORAGE_KEY);
  return records ? JSON.parse(records) : [];
};

export const getDiagnosisRecordById = (id: string): DiagnosisRecord | undefined => {
  const records = getDiagnosisRecords();
  return records.find(record => record.id === id);
};
