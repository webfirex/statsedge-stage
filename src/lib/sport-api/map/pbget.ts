import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class MapPBGet {
  public static readonly Route = "MapPBGet";
  public static readonly Path = "/v1/pickban/{id}/maps";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
      opponentId: z.number().optional(),
    }),

    Response: z
      .object({
        pickBan: z.array(
          z.object({
            order: z.number(),
            teamId: z.number().nullable(),
            pickOrBan: z.string(),
            mapName: z.string(),
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

      throw new Error("Error while fetching Map Pick Ban");
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

      throw new Error("Error while validating Map Pick Ban");
    }

    return validatedRes.data;
  };
}
