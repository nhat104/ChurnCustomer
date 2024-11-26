import type { QueryParams } from 'src/api/type';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

/* --- STATE --- */
export interface ModelState {
  loading: boolean;
  dataModel?: ModelDetail;
  scoresByModel: ScoreHistoryResponse[];
  deleteModelStatus: boolean;
  error: boolean;

  editNameMode: boolean;
}

export interface ModelDetail {
  id: number;
  name?: string;
  cutoff_selection?: number;
  predictive_power?: number;
  path?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ModelUpdate {
  name?: string;
}

export interface scoresByModelRequest {
  modelId: number;
  params: QueryParams;
}
