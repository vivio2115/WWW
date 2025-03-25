export type ReportStatus = 'pending' | 'approved' | 'rejected';

export interface ScammerData {
  name: string;
  phoneNumber: string;
  email: string;
  bankAccount: string;
  socialMedia: string;
  website?: string;
  discordId?: string;
  discordUsername?: string;
}

export interface ScamReport {
  id: string;
  scammerData: ScammerData;
  description: string;
  proof?: string;
  reportedBy: string;
  date: string;
  status: ReportStatus;
  verificationNote: string;
  verifiedBy?: string;
  verificationDate?: string;
}

export interface StatusIndicator {
  bg: string;
  text: string;
  label: string;
  icon: React.ReactNode;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'viewer';
  lastLogin?: string;
}