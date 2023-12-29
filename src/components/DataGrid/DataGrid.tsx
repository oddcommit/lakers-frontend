import {
  DataGrid as MuiDataGrid,
  jaJP,
  type DataGridProps,
} from "@mui/x-data-grid";

// 不要であったり、不変にしたり等で外から受け取らないプロパティ
type OmitProperties = "autoHeight" | "density" | "localeText";

interface IProps extends Omit<DataGridProps, OmitProperties> {}

const DataGrid: React.FC<IProps> = (props) => {
  return (
    <MuiDataGrid
      autoHeight
      density="compact"
      localeText={{
        ...jaJP.components.MuiDataGrid.defaultProps.localeText,
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) =>
            `${count.toLocaleString()}件中 ${from.toLocaleString()}件 〜 ${to.toLocaleString()}件`,
          labelRowsPerPage: "ページあたりの行数:",
        },
      }}
      {...props}
    />
  );
};

DataGrid.defaultProps = {
  loading: false,
  disableSelectionOnClick: false,
};

export { DataGrid };
