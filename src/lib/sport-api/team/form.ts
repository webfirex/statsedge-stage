import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class TeamForm {
  public static readonly Route = "TeamForm";
  public static readonly Path = "/v1/participants/{}/form";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
      opponentId: z.number().optional(),
    }),

    Response: z
      .object({
        teamName: z.string(),
        fixtureCount: z.number(),
        fixtures: z
          .array(
            z.object({
              opponentName: z.string().nullable(),
              score: z.number(),
              opponentScore: z.number(),
              fixtureTime: z.number(),
              fixtureId: z.number(),
              competitionName: z.string().optional().nullable(),
              mapName: z.string().optional().nullable(),
            })
          )
          .nullable(),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(this.Path.replace("{}", params.id.toString()));

    url.searchParams.append("count", "5");

    if (params.opponentId) {
      url.searchParams.append("opponent", params.opponentId.toString());
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

      throw new Error("Error while fetching team");
    }

    const rawData: unknown = await rawRes.json();

    console.log(JSON.stringify(rawData));

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error({
        err: validatedRes.error,
        rawRes,
        input: params,
        route: this.Route,
      });

      throw new Error("Error while validating team form");
    }

    return validatedRes.data;
  };
}
