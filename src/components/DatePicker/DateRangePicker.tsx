import { Box } from "@mui/material";
import { DatePicker } from "./DatePicker";

interface IProps {
  startDateLabel: string;
  startDateDisableFuture?: boolean;
  startDateDisablePast?: boolean;
  startDate: Date | null;
  onChangeStartDate: (date: Date | null) => void;
  endDateLabel: string;
  endDateDisableFuture?: boolean;
  endDateDisablePast?: boolean;
  endDate: Date | null;
  onChangeEndDate: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  defaultCalendarMonth?: Date;
}

const DateRangePicker: React.FC<IProps> = (props) => {
  const {
    startDateLabel,
    startDateDisableFuture,
    startDateDisablePast,
    startDate,
    onChangeStartDate,
    endDateLabel,
    endDateDisableFuture,
    endDateDisablePast,
    endDate,
    onChangeEndDate,
    minDate,
    maxDate,
    defaultCalendarMonth,
  } = props;

  // TODO: UIがダサいのでいい感じに

  return (
    <>
      <Box sx={{ mr: 1 }}>
        <DatePicker
          label={startDateLabel}
          value={startDate}
          onChange={onChangeStartDate}
          minDate={minDate}
          /** 開始日の最大値は、終了日または設定された値 */
          maxDate={endDate !== null ? endDate : maxDate}
          disableFuture={startDateDisableFuture}
          disablePast={startDateDisablePast}
          defaultCalendarMonth={defaultCalendarMonth}
        />
      </Box>

      <DatePicker
        label={endDateLabel}
        value={endDate}
        onChange={onChangeEndDate}
        /** 終了日の最小値は、開始日または設定された値 */
        minDate={startDate !== null ? startDate : minDate}
        maxDate={maxDate}
        disableFuture={endDateDisableFuture}
        disablePast={endDateDisablePast}
        defaultCalendarMonth={defaultCalendarMonth}
      />
    </>
  );
};

DateRangePicker.defaultProps = {
  startDateDisableFuture: false,
  endDateDisableFuture: false,
  startDateDisablePast: false,
  endDateDisablePast: false,
};

export { DateRangePicker };
