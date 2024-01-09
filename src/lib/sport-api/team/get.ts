import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class TeamGet {
  public static readonly Route = "TeamGet";
  public static readonly Path = "/v1/teams";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number().int(),
        name: z.string(),
        country: z.string().nullable(),
        countryISO: z.string().length(2).nullable(),
        region: z.string().nullable(),
        most_recent_lineup: z
          .array(
            z.object({
              id: z.number().int(),
              name: z.string(),
            })
          )
          .nullable(),
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

      throw new Error("Error while fetching team");
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

      throw new Error("Error while validating team");
    }

    return validatedRes.data;
  };
}
