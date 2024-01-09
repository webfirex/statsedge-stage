import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const useTimeLeft = (param: number): string => {
  const [TimeLeftStr, setTimeLeftStr] = useState("0 seconds");

  const UpdateTimeLeft = () => {
    const now = new Date().getTime();
    const distance = param - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days > 0) {
      setTimeLeftStr(`${days} days ${hours} hours ${minutes} minutes`);
    } else if (hours > 0) {
      setTimeLeftStr(`${hours} hours ${minutes} minutes ${seconds} seconds`);
    } else if (minutes > 0) {
      setTimeLeftStr(`${minutes} minutes ${seconds} seconds`);
    } else {
      setTimeLeftStr(`${seconds} seconds`);
    }
  };

  const interval = useInterval(UpdateTimeLeft, 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return TimeLeftStr;
};
