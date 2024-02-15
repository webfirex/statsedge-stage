import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class TeamStats {
  public static readonly Route = "TeamStats";
  public static readonly Path = "/v1/stats/team";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        teamId: z.number(),
        teamName: z.string(),
        fixtureCount: z.number(),
        maps: z.array(
          z.object({
            mapName: z.string(),
            played: z.number(),
            won: z.number(),
          })
        ),
        // accumulatedMapStats: z.object({}),
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

      throw new Error(`${this.Route} - Error while fetching team stats`);
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

      throw new Error(`${this.Route} - Error while validating team stats`);
    }

    return validatedRes.data;
  };
}
