import { DiagnosisRecord } from '../types/diagnosis';

const STORAGE_KEY = 'diagnosis_records';

export const saveDiagnosisRecord = (record: DiagnosisRecord) => {
  const records = getDiagnosisRecords();
  const updatedRecords = [...records, record];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
  return record.id;
};

export const getDiagnosisRecords = (): DiagnosisRecord[] => {
  const records = localStorage.getItem(STORAGE_KEY);
  return records ? JSON.parse(records) : [];
};

export const getDiagnosisRecordById = (id: string): DiagnosisRecord | undefined => {
  const records = getDiagnosisRecords();
  return records.find(record => record.id === id);
};
