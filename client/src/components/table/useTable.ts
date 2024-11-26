import { useCallback, useState } from 'react';

interface TableFilter<T> {
  _page?: number;
  _rowsPerPage?: number;
  _order?: 'asc' | 'desc';
  _orderBy?: keyof T | '';
}

export function useTable<T>({
  _page = 0,
  _rowsPerPage = 5,
  _order = 'desc',
  _orderBy = '',
}: TableFilter<T>) {
  const [page, setPage] = useState<number>(_page);
  const [orderBy, setOrderBy] = useState<keyof T | ''>(_orderBy);
  const [rowsPerPage, setRowsPerPage] = useState<number>(_rowsPerPage);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>(_order);

  const onSort = useCallback(
    (id: keyof T) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: number[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: number) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
