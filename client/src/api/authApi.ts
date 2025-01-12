import type { SigninRequest, SignupRequest } from 'src/pages/sign-in/slice/types';

import baseApiRequest from './baseApiRequest';

export const authApi = {
  login(body: SigninRequest) {
    const url = 'auth/login';
    return baseApiRequest.post(url, body);
  },

  signup(body: SignupRequest) {
    const url = 'auth/signup';
    return baseApiRequest.post(url, body);
  },

  logout() {
    const url = 'logout';
    return baseApiRequest.get(url);
  },
};
