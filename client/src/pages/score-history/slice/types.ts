import type { ModelDetail } from 'src/pages/model-detail/slice/types';
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
  number_stay?: number;
  number_exit?: number;
  cutoff_selection?: number;
  ml_model?: ModelDetail;
  score_results: ScoreResultResponse[];
  created_at?: string;
  updated_at?: string;
}
