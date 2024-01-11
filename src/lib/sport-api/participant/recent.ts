import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiZod } from "../zod";

export class ParticipantRecent {
  public static readonly Route = "ParticipantRecent";
  public static readonly Path = "/v1/participants/{}/form";

  public static readonly Zod = {
    Params: z.object({
      teamId: z.number(),
    }),

    Query: z.object({
      opponentTeamId: z.number(),
      count: z.number().int().max(50),
    }),

    Response: z
      .object({
        teamId: z.number().int(),
        fixtureCount: z.number().int(),
        fixtures: z.array(
          z.object({
            fixtureId: z.number().int(),
            opponentId: z.number().int(),
            score: z.number().int(),
            opponentScore: z.number().int(),
            fixtureTime: SportApiZod.$Time,
          })
        ),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>,
    query: z.infer<typeof this.Zod.Query>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(
      this.Path.replace("{}", params.teamId.toString())
    );

    for (const [key, value] of Object.entries(query)) {
      url.searchParams.append(key, String(value));
    }

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

      throw new Error("Error while fetching team fixture");
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

      throw new Error("Error while validating response");
    }

    return validatedRes.data;
  };
}
