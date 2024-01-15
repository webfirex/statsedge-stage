import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiZod } from "../zod";

export class FixtureOdd {
  public static readonly Route = "FixtureOdd";
  public static readonly Path = "/v2/odds";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        map_total_rounds_over_under: z.array(z.object({
          decimalOdd: z.number(),
          overround: z.number(),
          probability: z.number(),
          roundsPlayed: z.number()
        }))
        // maps: z.array(SportApiZod.Map.Base).optional(),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(`${this.Path}/${params.id}?fields=map_total_rounds_over_under`);

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
