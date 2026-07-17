export type CheckStatus = "up" | "down";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Monitor {
  id: number;
  userId: number;
  name: string;
  url: string;
  interval: number;
  createdAt: string;
}

export interface Check {
  id: number;
  monitorId: number;
  status: CheckStatus;
  statusCode: number | null;
  responseTime: number;
  error: string;
  checkedAt: string;
}
