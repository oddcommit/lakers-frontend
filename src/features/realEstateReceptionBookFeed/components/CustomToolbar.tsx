import { useState } from "react";
import { Typography, Popover } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  GridToolbarContainer,
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";

interface IProps {
  disabled: boolean;
}

const StyledPopover = styled(Popover)`
  // Popoverにデフォルトで設定されているbox-shadowを削除
  .MuiPopover-paper {
    box-shadow: none;
  }
`;

const CustomToolbar: React.FC<IProps> = (props) => {
  const { disabled } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpenPopover = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <GridToolbarContainer sx={{ p: 0 }}>
        <Typography
          aria-owns={isOpenPopover ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{
            background: disabled ? "rgba(0, 0, 0, 0.12)" : "#FFF",
            borderRadius: "4px",
            margin: "16px",
            border: disabled ? "none" : "solid #1976d2 1px",
          }}
        >
          <GridToolbarExportContainer
            disabled={disabled}
            sx={{
              // https://mui.com/material-ui/react-button/#sizes と同様のpaddingを設定
              padding: "6px 16px",

              // アイコンとテキストのセンターラインをあわせる
              "& > span": {
                paddingBottom: "2px",
                marginRight: "4px",
              },
            }}
          >
            <GridCsvExportMenuItem
              options={{
                fileName: "R.E.DATA_不動産データ",
                utf8WithBom: true,
                allColumns: true, // 非表示も出力
              }}
            />
          </GridToolbarExportContainer>
        </Typography>
      </GridToolbarContainer>

      {disabled && (
        <StyledPopover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={isOpenPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: 39, // エクスポートボタンから8px離れる用に設定
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography
            sx={{
              padding: "8px 6px",
              background: "rgba(0, 0, 0, 0.54)",
              color: "#FFF",
              fontSize: "11px",
            }}
          >
            一覧をエクスポートするには1000件以下に絞り込んでください
          </Typography>
        </StyledPopover>
      )}
    </>
  );
};

export { CustomToolbar };
