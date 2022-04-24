export interface UserData {
  userEmail: string;
  userPassword: string;
  isAdmin: number;
}

export interface IncidentData {
  incidentType: string;
  severityLevel: string;
  incidentId: string;
  accountNumber: string;
  customerName: string;
  incidentTitle: string;
  incidentDescription: string;
  assignedTo: number;
  comment: string;
  status: string;
  userEmail?: string;
}

export interface CheckStatus {
  registrationNumber: string;
  tokenNumber: string;
}

export const ErrorConstants = { DatabaseConnection: "Error" };
