import type { QueryParams } from 'src/api/type';
import type { ScoreHistoryResponse } from 'src/pages/score-history/slice/types';

/* --- STATE --- */
export interface ModelState {
  loading: boolean;
  dataModel?: ModelDetail;
  deleteModelStatus: boolean;
  error: boolean;

  loadingScores: boolean;
  scoresByModel: ScoreHistoryResponse[];
  errorScores: boolean;

  loadingUpdate: boolean;
  errorUpdate: boolean;

  editNameMode: boolean;
}

export interface ModelDetail {
  id: number;
  name?: string;
  filename?: string;
  cutoff_selection?: number;
  predictive_power?: number;
  status?: string;
  path?: string;
  calculation?: number;
  last_score_time?: string;
  attributes?: ModelAttributes;
  created_at?: string;
  updated_at?: string;
}

interface ModelAttributes {
  total_records?: string;
  test_records?: string;
  stay_count?: string;
  exit_count?: string;
  stay_percentage?: string;
  exit_percentage?: string;
  no_columns?: string;
  target_column?: string;
  model_path?: string;
  roc_auc?: string;
  density_distribution?: {
    name: string;
    data: number[][];
  }[];
  ks_score_series?: {
    name: string;
    data: number[][];
  }[];
  roc_auc_series?: {
    name: string;
    data: number[][];
  }[];
  ks_score_attr?: KSScoreAttribute;
  y_test?: number[];
  y_pred?: number[];
  preprocess_time?: number;
  train_time?: number;
}

export interface KSScoreAttribute {
  ks_statistic?: number;
  ks_threshold?: number;
  point_positive?: number;
  point_negative?: number;
}

export interface ModelUpdate {
  name?: string;
  cutoff_selection?: number;
}

export interface ScoresByModelRequest {
  modelId: number;
  params: QueryParams;
}
