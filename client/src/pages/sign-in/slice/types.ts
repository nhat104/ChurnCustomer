/* --- STATE --- */
export interface AuthState {
  loading: boolean;
  dataAuth?: DataAuth;
  error: string;
}

export interface DataAuth {
  access_token?: string;
  refresh_token?: string;
  user?: UserInfo;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
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
