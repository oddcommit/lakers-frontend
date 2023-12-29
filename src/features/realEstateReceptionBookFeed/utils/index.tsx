import { type GridColDef, type GridColumnHeaderParams, type GridRenderCellParams, type GridValueGetterParams, type GridValueFormatterParams} from "@mui/x-data-grid";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {type IRealEstateReceptionBookDataGridRow} from "../types";
import {numberFormat} from "../../../utils/utils";

const RealEstateReceptionBookDataGridColumns: GridColDef[] = [
  {
    field: "legalAffairsBureauRequestDate",
    headerName: "法務局受付日",
    width: 180,
  },
  {
    field: "receptionReason",
    headerName: "登記原因",
    width: 200,
  },
  {
    field: "realEstateType",
    headerName: "不動産種別",
    width: 150,
  },

  {
    field: "prefectures",
    headerName: "都道府県",
    width: 140,
  },
  {
    field: "address",
    headerName: "所在",
    width: 200,
  },
  {
    field: "chiban",
    headerName: "地番または家屋番号",
    valueGetter: ({row}: GridValueGetterParams<string, IRealEstateReceptionBookDataGridRow>) => {
      return `${row.chiban || ''}${row.kaokuNumber || ''}`;
    },
    width: 160,
  },
  {
    field: "estimatedChiseki",
    headerName: "推計地積",
    renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          推計地積<br/>
          (㎡)
        </strong>
    ),
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      return params.value ? numberFormat(params.value, { maximumFractionDigits: 2}, 'floor') : "—";
    },
    width: 120,
  },
  {
    field: "publishedPrice",
    headerName: "公示価格",
    renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          公示価格<br/>
          (円/㎡)
        </strong>
    ),
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      return params.value ? numberFormat(params.value, { maximumFractionDigits: 0 }, 'floor') : "—";
    },
    width: 120,
  },
  {
    field: "estimatedPrice",
    headerName: "概算価格",
    renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          概算価格<br/>
          (百万円)
        </strong>
    ),
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      if (!params.value) {
        return "—"
      }
      return numberFormat(params.value / 1_000_000, { maximumFractionDigits: 1 }, 'floor');
    },
    width: 120,
  },
  {
    field: "areaUsePurpose",
    headerName: "用途地域",
    renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          用途<br/>
          地域
        </strong>
    ),
    width: 60,
    renderCell: (param: GridRenderCellParams) => {
      if (!param.value) {
        return (
            <Tooltip title="自治体へ照会お願いします">
              <IconButton>
                <HorizontalRuleIcon/>
              </IconButton>
            </Tooltip>
        )
      } else {
        return (<span>
          {param.value}
            </span>
        )
      }
    },
  },
  {
    field: "buildingRate",
    headerName: "建ぺい率",
    renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          建ぺい率(%)<br/>
          /容積率(%)
        </strong>
    ),
    renderCell: ({ row }: GridRenderCellParams<number, IRealEstateReceptionBookDataGridRow>) => {
      const buildingRate = row.buildingRate;
      if (!buildingRate) {
        return (
            <Tooltip title="自治体へ照会お願いします">
              <IconButton>
                <HorizontalRuleIcon/>
              </IconButton>
            </Tooltip>
        )
      } else {
        return (<span>
          {buildingRate}<br/>
          {row.volumeRate}
        </span>)
      }
    },
    width: 120,
  },
  {
    field: "volumeRate", // DataGrid initialState columnVisibilityModelで非表示にしている
    headerName: "容積率",
    width: 120,
  },
  {
    field: "outside",
    headerName: "外",
    width: 90,
  },
  {
    field: "realEstateBookType",
    headerName: "申請種別",
    width: 140,
  },
];

export { RealEstateReceptionBookDataGridColumns };
