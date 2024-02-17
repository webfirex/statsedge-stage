import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class PlayerGet {
  public static readonly Route = "PlayerGet";
  public static readonly Path = "/v1/players";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number().int(),
        firstName: z.string(),
        lastName: z.string().nullable(),
        nickname: z.string().optional(),
        age: z.number().int().nullable(),
        country: z.string().nullable(),
        countryISO: z.string().length(2).nullable(),
        sport: z.string(),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(`${this.Path}/${params.id}`);

    console.log(url.toString());

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      // 404
      if (rawRes.status === 404) {
        SportApiLogger.warn({
          err: {
            status: rawRes.status,
            statusText: rawRes.statusText,
          },
          url: url.toString(),
          input: params,
          route: this.Route,
        });

        return null;
      }

      SportApiLogger.error({
        err: {
          status: rawRes.status,
          statusText: rawRes.statusText,
        },
        url: url.toString(),
        input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while fetching player`);
    }

    const rawData: unknown = await rawRes.json();

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error({
        err: validatedRes.error,
        json: rawData,
        input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while parsing player`);
    }

    return validatedRes.data;
  };
}
