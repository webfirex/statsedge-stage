import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class PickBanMaps {
  public static readonly Route = "PickBanMaps";
  public static readonly Path = "/v1/pickban/{id}/maps";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        fixtureId: z.number(),
        pickBan: z.array(
          z.object({
            mapName: z.string(),
            order: z.number(),
            teamId: z.number().nullable(),
            pickOrBan: z.enum(["pick", "ban"]),
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
