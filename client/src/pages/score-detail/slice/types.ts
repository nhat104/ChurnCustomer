import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

/* --- STATE --- */
export interface ScoreResultState {
  loading: boolean;
  dataScoreHistory?: ScoreHistoryResponse;
  error: boolean;
}

export interface ScoreResultResponse {
  id: number;
  row?: number;
  score?: number;
  decision?: string;
}
