import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class FixtureStatsDOTA {
  public static readonly Route = "FixtureStatsDOTA";
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
                    items: z.array(z.number()).optional(),
                    backpackItems: z.array(z.number()).optional(),
                    neutralItem: z.number().optional(),
                    aghanimsShard: z.boolean().optional(),
                    aghanimsScepter: z.boolean().optional(),
                    level: z.number().optional(),
                    role: z.enum(["Core", "Support"]).optional(),
                    heroId: z.number().optional(),
                    xpMin: z.number().optional(),
                    stunTime: z.number().optional(),
                    firstBlood: z.boolean().optional(),
                    roshanKills: z.number().optional(),
                    towerDamage: z.number().optional(),
                    damageReceived: z.number().optional(),
                    campsStacked: z.number().optional(),
                    creepsStacked: z.number().optional(),
                    skillOrder: z.array(z.number()).optional(),
                    timeToLvl6: z.number().optional(),
                    xpByMinute: z.array(z.number()).optional(),
                    goldByMinute: z.array(z.number()).optional(),
                    lastHitsByMinute: z.array(z.number()).optional(),
                    deniesByMinute: z.array(z.number()).optional(),
                    bountyRunes: z.number().optional(),
                    runesCollected: z.number().optional(),
                    sentryWardsKilled: z.number().optional(),
                    sentryWardsPlaced: z.number().optional(),
                    observerWardsKilled: z.number().optional(),
                    observerWardsPlaced: z.number().optional(),
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
