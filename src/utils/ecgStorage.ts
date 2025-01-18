import { ECGRecord } from '../types/ecg';
const STORAGE_KEY = 'ecg_records';

// utils/ecgStorage.ts
// utils/ecgStorage.ts
export const saveECGRecord = async (record: ECGRecord) => {
  let recordToSave = { ...record };
  
  // 파일이 존재할 때만 변환 진행
  if (record.ecgFile instanceof File) {  // 타입 가드 추가
    const reader = new FileReader();
    const base64String = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(record.ecgFile as File);
    });
    recordToSave.ecgFileData = base64String;
  }
  
  delete recordToSave.ecgFile;  // File 객체 제거

  const records = JSON.parse(localStorage.getItem('ecg_records') || '[]');
  records.unshift(recordToSave);
  localStorage.setItem('ecg_records', JSON.stringify(records));
};

export const getECGRecords = (): ECGRecord[] => {
  const records = localStorage.getItem(STORAGE_KEY);
  return records ? JSON.parse(records) : [];
};

export const getECGRecordById = (id: string): ECGRecord | undefined => {
  const records = getECGRecords();
  return records.find(record => record.id === id);
};