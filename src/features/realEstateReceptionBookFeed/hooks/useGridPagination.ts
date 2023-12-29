import { useState } from "react";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

interface IUseGridPaginationReturnType {
  page: number;
  pageSize: number;
  changePage: (pageIndex: number) => void;
  changePageSize: (pageSize: number) => void;
}

export const useGridPagination = (): IUseGridPaginationReturnType => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const changePage = (page: number): void => {
    setPage(page);
  };

  const changePageSize = (pageSize: number): void => {
    setPage(DEFAULT_PAGE);
    setPageSize(pageSize);
  };

  return {
    page,
    pageSize,
    changePage,
    changePageSize,
  };
};
