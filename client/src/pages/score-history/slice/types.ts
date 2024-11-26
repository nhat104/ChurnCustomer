import type { ModelResponse } from 'src/pages/models/slice/types';
import type { ScoreResultResponse } from 'src/pages/score-detail/slice/types';

/* --- STATE --- */
export interface ScoreHistoryState {
  loading: boolean;
  dataScoreHistories?: ScoreHistoryResponse[];
  error: boolean;
}

export interface ScoreHistoryResponse {
  id: number;
  name?: string;
  status?: string;
  number_approve?: number;
  number_decline?: number;
  ml_model: ModelResponse;
  score_results: ScoreResultResponse[];
  created_at?: string;
  updated_at?: string;
}
