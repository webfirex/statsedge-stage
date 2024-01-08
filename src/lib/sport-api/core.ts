import { env } from "~/env";
import fetch from "node-fetch";
import { WorldLogger } from "~/server/logger";

export const SportApiLogger = WorldLogger.child({
  from: "SportApi",
});

export class SportApiCore {
  private static readonly API_KEY = env.SPORT_API_KEY;
  private static readonly BASE_URL = env.SPORT_BASE_URL;

  public static async GetRequest<T = unknown>(params: {
    url: string;
  }): Promise<T> {
    const res = await fetch(params.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = (await res.json()) as T;

    return data;
  }

  public static async Request(params: {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
  }) {
    const res = await fetch(params.url, {
      method: params.method,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
      },
    });

    return res;
  }

  public static URL = (path: string): URL => {
    return new URL(this.BASE_URL + path);
  };
}
