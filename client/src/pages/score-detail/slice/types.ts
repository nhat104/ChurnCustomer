import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

/* --- STATE --- */
export interface ScoreResultState {
  loading: boolean;
  dataScoreResult?: ScoreResultResponse;
  dataScoreHistory?: ScoreHistoryResponse;
  deleteScoreHistoryStatus: boolean;
  error: boolean;

  editNameMode: boolean;
}

export interface ScoreResultResponse {
  id: number;
  row?: number;
  name: number;
  score?: number;
  resolution?: string;
  interpretation?: [number, number, string][];
}

export interface ScoreHistoryUpdate {
  name?: string;
}
