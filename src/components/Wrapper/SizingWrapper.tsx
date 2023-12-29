import { Box } from "@mui/material";

enum SizingWrapperStyle {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

interface ISizingWrapperProps {
  size?: SizingWrapperStyle;
}

interface IProps extends ISizingWrapperProps {
  children: React.ReactNode;
}

const SizingWrapper: React.FC<IProps> = (props) => {
  const { children, size = SizingWrapperStyle.MEDIUM } = props;
  const SizingWrapperStyleMap: Record<SizingWrapperStyle, number> = {
    [SizingWrapperStyle.SMALL]: 150,
    [SizingWrapperStyle.MEDIUM]: 250,
    [SizingWrapperStyle.LARGE]: 350,
  };

  return <Box sx={{ width: SizingWrapperStyleMap[size] }}>{children}</Box>;
};

export { SizingWrapper, type ISizingWrapperProps, SizingWrapperStyle };
