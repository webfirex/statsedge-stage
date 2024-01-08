import { pino } from "pino";
import pretty from "pino-pretty";
import { env } from "~/env";

const getWorldLogger = () => {
  if (env.NODE_ENV === "development") {
    const stream = pretty({
      levelFirst: true,
      colorize: true,
      ignore: "time,hostname,pid",
    });

    return pino(
      {
        level: "trace",
      },
      stream
    );
  }

  return pino({
    level: "debug",
  });
};

export const WorldLogger = getWorldLogger();
