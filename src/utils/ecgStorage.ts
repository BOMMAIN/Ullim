import { ECGRecord } from '../types/ecg';
const STORAGE_KEY = 'ecg_records';

export const saveECGRecord = (record: ECGRecord) => {
  const records = getECGRecords();
  const updatedRecords = [...records, record];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
  return record.id;
};

export const getECGRecords = (): ECGRecord[] => {
  const records = localStorage.getItem(STORAGE_KEY);
  return records ? JSON.parse(records) : [];
};

export const getECGRecordById = (id: string): ECGRecord | undefined => {
  const records = getECGRecords();
  return records.find(record => record.id === id);
};