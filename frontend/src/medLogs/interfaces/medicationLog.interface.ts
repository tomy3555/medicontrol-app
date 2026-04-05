export interface MedicationLog  {
  id: number;
  scheduleId: number;
  takenAt: string;
  logDate: string; 
  medicationName: string;
  medicationDosage: string;
}