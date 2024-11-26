/* --- STATE --- */
export interface ModelsState {
  loading: boolean;
  dataModels?: ModelResponse[];
  error: boolean;
}

export interface ModelResponse {
  id: number;
  name?: string;
  cutoff_selection?: number;
  predictive_power?: number;
  status?: string;
  path?: string;
  calculation?: number;
  last_score_time?: string;
  created_at?: string;
  updated_at?: string;
}
