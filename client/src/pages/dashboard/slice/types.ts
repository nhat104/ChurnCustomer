import type { ModelResponse } from 'src/pages/models/slice/types';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

/* --- STATE --- */
export interface DashboardState {
  loading: boolean;
  uploadData?: ModelResponse;
  predictResult?: ScoreHistoryResponse;
  error: boolean;
}
