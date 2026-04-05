export interface Medication {
  id: string;

  name: string;
  dosage: string;
 

  notes?: string;

  status: "active" | "paused" | "completed"; //no usado al final, pero queda para un futuro
  createdAt?: string;
  updatedAt?: string;
}
