import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class PlayerCSState {
  public static readonly Route = "PlayerCSState";
  public static readonly Path = "/v1/players";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        payload: z.object({
          timestamp: z.number(),
          name: z.string(),
          mapNumber: z.number(),
          halfNumber: z.number(),
          roundNumber: z.number(),
          players: z.array(z.object({
            name: z.string(),
            teamId: z.number(),
            playerId: z.number(),
            money: z.number(),
          }))
        })
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

      throw new Error("Error while fetching player");
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

      throw new Error("Error while validating player");
    }

    return validatedRes.data;
  };
}
