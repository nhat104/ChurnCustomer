import type { ScoreHistoryUpdate } from 'src/pages/score-detail/slice/types';

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

  update(id: string | number, body: ScoreHistoryUpdate) {
    const url = `score/${id}`;
    return baseApiRequest.patch(url, body);
  },

  delete(id: string | number) {
    const url = `score/${id}`;
    return baseApiRequest.delete(url);
  },
};
