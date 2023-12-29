import ja from "date-fns/locale/ja";
import { FormControl, TextField } from "@mui/material";
import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SizingWrapper, type ISizingWrapperProps } from "../Wrapper";

interface IProps extends ISizingWrapperProps {
  label: string;
  value: null | Date;
  onChange: (value: Date | null) => void;
  maxDate?: Date;
  minDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  defaultCalendarMonth?: Date;
}

const DatePicker: React.FC<IProps> = (props) => {
  const {
    label,
    value,
    onChange,
    maxDate,
    minDate,
    disableFuture,
    disablePast,
    defaultCalendarMonth,
    size,
  } = props;

  const errorText = "日付の形式が正しくありません";

  return (
    <SizingWrapper size={size}>
      <FormControl fullWidth>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ja}
          dateFormats={{ monthAndYear: "yyyy年 MM月", year: "yyyy年" }}
          localeText={{
            previousMonth: "前月を表示", // < のツールチップ
            nextMonth: "次月を表示", // > のツールチップ
            cancelButtonLabel: "キャンセル", // スマホ画面のCANCELボタン
            okButtonLabel: "選択", // スマホ画面のOKボタン
          }}
        >
          <MuiDatePicker
            // TODO: iconを設置して、Clearableにする
            // issueにて議論されているので実装されるかも(https://github.com/mui/mui-x/issues/4450)
            // TODO: 逆にTextFieldはClearできなくていい
            label={label}
            value={value}
            defaultCalendarMonth={defaultCalendarMonth}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={params.error === true ? errorText : null}
              />
            )}
            inputFormat="yyyy年MM月dd日"
            mask="____年__月__日"
            disableFuture={disableFuture}
            disablePast={disablePast}
            maxDate={maxDate}
            minDate={minDate}
          />
        </LocalizationProvider>
      </FormControl>
    </SizingWrapper>
  );
};

DatePicker.defaultProps = {
  maxDate: undefined,
  minDate: undefined,
  disableFuture: false,
  disablePast: false,
};

export { DatePicker };
