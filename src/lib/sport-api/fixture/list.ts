import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class FixtureList {
  public static Path = "/v1/fixtures";

  public static Zod = {
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
          competition: z.object({
            id: z.number(),
            name: z.string(),
            derivatives: z
              .object({
                number: z.string(),
                time_of_year: z.string(),
                series: z.string(),
              })
              .nullable(),
          }),

          format: z.object({
            name: z.string(),
            value: z.number(),
            isMapTieable: z.boolean().optional(),
          }),
          id: z.number(),
          links: z.array(
            z.object({
              link: z.string(),
              rel: z.string(),
            })
          ),
          participants: z.array(
            z.object({
              id: z.number().nullable(),
              name: z.string().nullable(),
              score: z.number(),
              scoreWithoutHandicap: z.number(),
              handicap: z.number(),
            })
          ),
          scheduledStartTime: z.number(),
          sport: z.object({
            alias: z.string(),
            name: z.string(),
          }),
          endTime: z.number().nullable(),
          startTime: z.number().nullable(),
          status: z.enum([
            "Scheduled",
            "Started",
            "Ended",
            "Forfeited",
            "Cancelled",
          ]),
          tie: z.boolean().nullable(),
          winnerId: z.number().nullable(),
        })
      ),
      totalCount: z.number(),
    }),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const validatedParams = this.Zod.Params.parse(params);

    const url = SportApiCore.URL(this.Path);

    for (const [key, value] of Object.entries(validatedParams)) {
      url.searchParams.append(key, String(value));
    }

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      SportApiLogger.error(
        {
          err: {
            status: rawRes.status,
            statusText: rawRes.statusText,
          },
          route: "FixtureList.Call",
          input: params,
        },
        "Error fetching fixture list"
      );

      throw new Error("Error while fetching fixture list");
    }

    const rawData: unknown = await rawRes.json();

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error(
        {
          err: validatedRes.error,
          route: "FixtureList.Call",
          input: params,
          rawRes,
        },
        "Error validating FixtureList.Call response"
      );

      throw new Error("Error while validating response");
    }

    return validatedRes.data;
  };
}
