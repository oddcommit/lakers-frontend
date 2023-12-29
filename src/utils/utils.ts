import { floor } from 'mathjs'

const stringBooleanToBoolean = (args: "true" | "false"): boolean => {
  return JSON.parse(args.toLowerCase()) as boolean;
};

const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, (s) => "_" + s.charAt(0).toLowerCase());
};

const numberFormat = (num: number, options?: Intl.NumberFormatOptions, roundingMode?: 'floor'): string => {
  let value = num;
  if (options?.maximumFractionDigits != null && roundingMode === "floor") {
      value = floor(num, options.maximumFractionDigits);
  }
  return new Intl.NumberFormat("ja-JP", options).format(value);
};

export { stringBooleanToBoolean, camelToSnake, numberFormat };
