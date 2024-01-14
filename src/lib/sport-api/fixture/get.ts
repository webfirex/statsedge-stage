import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiZod } from "../zod";

export class FixtureGet {
  public static readonly Route = "FixtureGet";
  public static readonly Path = "/v1/fixtures";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number().int(),
        tie: z.boolean().nullable(),
        winnerId: z.number().nullable(),
        scheduledStartTime: SportApiZod.$Time,
        startTime: SportApiZod.$Time.nullable(),
        endTime: SportApiZod.$Time.nullable(),
        status: SportApiZod.$Status,
        format: SportApiZod.Format,
        competition: SportApiZod.Competition,
        sport: SportApiZod.Sport,
        participants: z.array(SportApiZod.Participants),
        links: z.array(SportApiZod.Links),
        maps: z.array(SportApiZod.Map.Base).optional(),
        // maps: z.array(SportApiZod.Map.Base).optional(),
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

      throw new Error("Error while fetching fixture");
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
