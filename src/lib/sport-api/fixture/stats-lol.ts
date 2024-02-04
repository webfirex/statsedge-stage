import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class FixtureStatsLOL {
  public static readonly Route = "FixtureStatsLOL";
  public static readonly Path = "/v1/fixtures/{id}/stats";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        maps: z.array(
          z.object({
            mapNumber: z.number(),
            teamStats: z.array(
              z.object({
                teamId: z.number(),
                players: z.array(
                  z.object({
                    name: z.string(),
                    playerId: z.number(),
                    items: z.array(z.number()),
                    level: z.number(),
                    trinket: z.number(),
                    position: z.enum([
                      "Top",
                      "Jungle",
                      "Middle",
                      "Bottom",
                      "Support",
                    ]),
                    championId: z.number(),
                    visionScore: z.number(),
                    wardsKilled: z.number(),
                    wardsPlaced: z.number(),
                    controlWardsPurchased: z.number(),
                  })
                ),
              })
            ),
          })
        ),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(
      this.Path.replace("{id}", params.id.toString())
    );

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

      throw new Error(`${this.Route}: Error while fetching`);
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

      throw new Error(`${this.Route}: Error while validating response`);
    }

    return validatedRes.data;
  };
}
