import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class PlayerStats {
  public static readonly Route = "PlayerStats";
  public static readonly Path = "/v1/stats/player";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        playerId: z.number().int(),
        playerName: z.string(),
        fixtureCount: z.number().int(),
        mapsCount: z.number().int(),
        roundCount: z.number().int(),

        // CSGO Player Stats
        averagePerRound: z.object({
          kills: z.number(),
          deaths: z.number(),
          assists: z.number(),
          flash_assists: z.number(),
          headshots: z.number(),
          entryKills: z.number(),
          suicides: z.number(),
          adr: z.number(),
          kast: z.number(),
        }),

        meta: z.object({
          gsk_rating: z.number(),
        }),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(`${this.Path}/${params.id}`);

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      // 404
      if (rawRes.status === 404) {
        return null;
      }

      SportApiLogger.error({
        err: {
          status: rawRes.status,
          statusText: rawRes.statusText,
        },
        input: params,
        route: this.Route,
      });

      throw new Error("Error while fetching player stats");
    }

    const rawData: unknown = await rawRes.json();

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error({
        err: validatedRes.error,
        rawRes,
        input: params,
        route: this.Route,
      });

      throw new Error("Error while validating player stats");
    }

    return validatedRes.data;
  };
}
