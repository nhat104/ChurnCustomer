import type { ModelUpdate, scoresByModelRequest } from 'src/pages/model-detail/slice/types';

import baseApiRequest from './baseApiRequest';

import type { QueryParams } from './type';

export const modelApi = {
  getAll({ offset = 0, limit = 50 }: QueryParams) {
    const url = `model?offset=${offset}&limit=${limit}`;
    return baseApiRequest.get(url);
  },

  uploadData(body: FormData) {
    const url = 'model/upload_data';
    return baseApiRequest.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getOne(id: number | string) {
    const url = `model/${id}`;
    return baseApiRequest.get(url);
  },

  predict(id: number | string, body: FormData) {
    const url = `model/${id}/predict`;
    return baseApiRequest.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  create(body: unknown) {
    const url = 'model';
    return baseApiRequest.post(url, body);
  },

  update(id: number | string, body: ModelUpdate) {
    const url = `model/${id}`;
    return baseApiRequest.patch(url, body);
  },

  delete(id: string | number) {
    const url = `model/${id}`;
    return baseApiRequest.delete(url);
  },

  getScoreHistory({ modelId, params }: scoresByModelRequest) {
    const { offset = 0, limit = 50 } = params;
    const url = `score/model/${modelId}?offset=${offset}&limit=${limit}`;
    return baseApiRequest.get(url);
  },
};