export { useTable } from './useTable';
export { TableNoData } from './table-no-data';
export { TableEmptyRows } from './table-empty-rows';
export { emptyRows, applyFilter, getComparator, visuallyHidden } from './utils';

export interface TableHeadLabel<T1, T2 = {}> {
  id: keyof T1 | keyof T2 | '';
  align?: 'left' | 'center' | 'right';
  label?: string;
  width?: number;
  minWidth?: number;
}
