/* --- STATE --- */
export interface LoginState {
  loading: boolean;
  dataAuth?: DataAuth;
  error: boolean;
}

export interface DataAuth {
  access_token?: string;
  refresh_token?: string;
  user?: UserInfo;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  id?: number;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}
