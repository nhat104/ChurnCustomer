import baseApiRequest from './baseApiRequest';

export const scoreResultApi = {
  getOne(id: string | number) {
    const url = `score-result/${id}`;
    return baseApiRequest.get(url);
  },
};
