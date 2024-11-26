import baseApiRequest from './baseApiRequest';

export const authApi = {
  login(body: unknown) {
    const url = 'auth/login';
    return baseApiRequest.post(url, body);
  },

  logout() {
    const url = 'logout';
    return baseApiRequest.get(url);
  },
};
