import { styled } from "@mui/material/styles";
import { DataGrid } from "../../../components/DataGrid";
import { useGridFeed } from "../hooks/useGridFeed";
import { useGridPagination } from "../hooks/useGridPagination";
import { RealEstateReceptionBookDataGridColumns } from "../utils";
import { CustomToolbar } from "./CustomToolbar";
import { type IFilterCondition } from "../types";

interface IProps {
  filterCondition: IFilterCondition;
}

const StyledDataGrid = styled(DataGrid)`
  // 縦並びで配置されている要素を横並べに変更し、折り返すように
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 0px;

  // カスタムバーとページネーションでwidth100%になるように配置
  & > div:nth-of-type(1) {
    width: 40%;
    align-self: center;
  }

  & > div:nth-of-type(3) {
    width: 60%;
    align-self: center;
  }

  // タイトルのborderと重複するため削除
  & > div:nth-of-type(3) > .MuiDataGrid-footerContainer {
    border-top: 0px;
  }

  // テーブルは折返しで全画面表示
  & > div:nth-of-type(2) {
    width: 100%;
    order: 3;
  }

  // テーブルヘッダーの背景色を設定
  .MuiDataGrid-columnHeaders {
    background: rgba(0, 0, 0, 0.04);
    line-height: 1.5em !important;
  }

  // テーブルタイトルを太字に
  .MuiDataGrid-columnHeaderTitle {
    font-weight: 700;
  }

  // ページネーションの件数表示を太字に
  .MuiTablePagination-displayedRows {
    font-weight: 700;
  }

  .MuiTablePagination-selectIcon {
    color: #000;
  }
`;

export const FeedGrid: React.FC<IProps> = ({ filterCondition }) => {
  const { page, pageSize, changePage, changePageSize } = useGridPagination();
  const { rows, allCount, loading, sortByGridSortModel } = useGridFeed({
    page,
    pageSize,
    ...filterCondition,
  });

  return (
    <StyledDataGrid
      // 方向性が決まるまでフィルタ機能は無効化
      // https://www.notion.so/trustart/1cb84cb89e4340fe8458d1f34146dc47?pvs=4#2e58a1a7e0654761bbb60c11f32237f5
      disableColumnFilter
      rows={rows}
      columns={RealEstateReceptionBookDataGridColumns}
      initialState={{
        columns: {
          columnVisibilityModel: {
            // Hide columns, the other columns will remain visible
            volumeRate: false, // Only CSV
          },
        },
      }}
      rowCount={allCount}
      pageSize={pageSize}
      page={page}
      loading={loading}
      sortingMode="server"
      rowsPerPageOptions={[10, 50, 100]}
      onPageChange={changePage}
      onPageSizeChange={changePageSize}
      onSortModelChange={sortByGridSortModel}
      disableSelectionOnClick={true}
      headerHeight={100}
      getRowHeight={() => 'auto' as const}
      components={{
        Toolbar: CustomToolbar,
      }}
      componentsProps={{
        toolbar: {
          disabled: loading ? true : rows.length >= 1000,
        },
      }}
    />
  );
};
