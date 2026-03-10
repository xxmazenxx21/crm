export interface User {
  id: string;
  name: string;
  email: string;
  role: 'sales' | 'manager';
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface Meeting {
  _id: string;
  customerName: string;
  phone: string;
  storeName: string;
  storeLink?: string;
  meetingDate: string;
  meetingTime: string;
  notes: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMeetingInput {
  customerName: string;
  phone: string;
  storeName: string;
  storeLink?: string;
  meetingDate: string;
  meetingTime: string;
  notes?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface SingleResponse<T> {
  success: boolean;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
}
