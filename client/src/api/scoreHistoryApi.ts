import baseApiRequest from './baseApiRequest';

import type { QueryParams } from './type';

export const scoreHistoryApi = {
  getAll({ offset = 0, limit = 50 }: QueryParams) {
    const url = `score?offset=${offset}&limit=${limit}`;
    return baseApiRequest.get(url);
  },

  getOne(id: string) {
    const url = `score/${id}`;
    return baseApiRequest.get(url);
  },

  create(body: unknown) {
    const url = 'score';
    return baseApiRequest.post(url, body);
  },

  update(id: string, body: unknown) {
    const url = `score/${id}`;
    return baseApiRequest.put(url, body);
  },

  delete(id: string) {
    const url = `score/${id}`;
    return baseApiRequest.delete(url);
  },
};
