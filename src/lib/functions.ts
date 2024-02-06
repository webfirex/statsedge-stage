import { SPORT_INFO } from "./data";

/**
 *
 * @param params Game alias
 * @returns
 */
export const SportInfo = (params: string) => {
  return (
    SPORT_INFO.find(
      (game) => game.alias.toLowerCase() === params.toLowerCase()
    ) ?? null
  );
};

type FormatTypes =
  | "Monday, 8th January 2021"
  | "Mon, 14:00"
  | "2017-12-31"
  | "19th December 2021"
  | "14:00";

export const NumTimeFormat = (param: number, format: FormatTypes) => {
  switch (format) {
    case "Monday, 8th January 2021": {
      const date = new Date(param);
      const day = date.toLocaleString("default", { weekday: "long" });
      const month = date.toLocaleString("default", { month: "long" });
      const dayOfMonth = date.getDate();
      const year = date.getFullYear();

      return `${day}, ${dayOfMonth}th ${month} ${year}`;
    }

    case "Mon, 14:00": {
      const date = new Date(param);
      const day = date.toLocaleString("default", { weekday: "short" });
      const hour = date.getHours();
      const minute = date.getMinutes();

      return `${day}, ${hour}:${minute}`;
    }

    case "2017-12-31": {
      const date = new Date(param);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${year}-${month + 1}-${day}`;
    }

    case "19th December 2021": {
      const date = new Date(param);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();

      return `${day}th ${month} ${year}`;
    }

    case "14:00": {
      const date = new Date(param);
      const hour = date.getHours();
      const minute = date.getMinutes();

      return `${hour}:${minute}`;
    }

    default: {
      return "Invalid format";
    }
  }
};

/**
 * ! Specific use case for the datepicker
 */
export function convertStringToDate(dateString: string) {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return null;
  }

  const year = parseInt(parts[0]!, 10);
  const month = parseInt(parts[1]!, 10);
  const day = parseInt(parts[2]!, 10);

  if (year < 0 || month < 0 || month > 11 || day < 1 || day > 31) {
    throw null;
  }

  return new Date(year, month, day);
}

export const NumTimeToDayStartTime = (param: number): number => {
  const date = new Date(param);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return new Date(year, month, day).getTime();
};

export const UTCToLocalTime = (param: number): number => {
  const date = new Date(param);
  const offset = date.getTimezoneOffset() * 60000;

  return param + offset;
};

export const LocalTimeToUTC = (param: number): number => {
  const date = new Date(param);
  const offset = date.getTimezoneOffset() * 60000;

  return param - offset;
};

export const ArrayPagination = <T>(params: {
  array: T[];
  page: number;
  limit: number;
}): T[] => {
  const { array, page, limit } = params;

  const start = (page - 1) * limit;
  const end = page * limit;

  return array.slice(start, end);
};

export const MoneyToThousands = (params: number): string => {
  return (params / 1000).toFixed(1);
};
