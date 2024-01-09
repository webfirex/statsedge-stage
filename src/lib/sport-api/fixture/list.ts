import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiZod } from "../zod";

export class FixtureList {
  public static readonly Route = "FixtureList";
  public static readonly Path = "/v1/fixtures";

  public static readonly Zod = {
    Params: z.object({
      sport: z.string().min(1).optional(),
      competitionId: z.string().optional(),

      from: z.union([z.string(), z.number().int()]).optional(),
      to: z.union([z.string(), z.number().int()]).optional(),

      page: z.number().int().min(1).optional(),

      pageCount: z.number().int().min(1).max(50).optional(),

      status: z
        .enum(["Scheduled", "Started", "Ended", "Forfeited", "Cancelled"])
        .optional(),

      sort: z.enum(["asc", "desc"]).optional(),
    }),

    Response: z.object({
      fixtures: z.array(
        z.object({
          id: z.number(),
          winnerId: z.number().nullable(),
          tie: z.boolean().nullable(),
          endTime: SportApiZod.$Time.nullable(),
          startTime: SportApiZod.$Time.nullable(),
          status: SportApiZod.$Status,
          scheduledStartTime: SportApiZod.$Time,
          competition: SportApiZod.Competition,
          format: SportApiZod.Format,
          links: z.array(SportApiZod.Links),
          participants: z.array(SportApiZod.Participants),
          sport: SportApiZod.Sport,
        })
      ),
      totalCount: z.number(),
    }),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    

    const url = SportApiCore.URL(this.Path);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      SportApiLogger.error({
        err: {
          status: rawRes.status,
          statusText: rawRes.statusText,
        },
        input: params,
        route: this.Route,
      });

      throw new Error("Error while fetching fixture list");
    }

    const rawData: unknown = await rawRes.json();

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error({
        err: validatedRes.error,
        input: params,
        rawRes,
        route: this.Route,
      });

      throw new Error("Error while validating response");
    }

    return validatedRes.data;
  };
}
