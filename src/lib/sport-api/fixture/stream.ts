import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class FixtureStream {
  public static readonly Route = "FixtureStream";
  public static readonly Path = "/v1/fixtures/{}/streams";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        fixtureId: z.number().int(),
        streams: z.array(
          z.object({
            streamName: z.string(),
            language: z.string(),
            url: z.string(),
          })
        ),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    const url = SportApiCore.URL(this.Path.replace("{}", params.id.toString()));

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

      throw new Error("Error while fetching fixture streams");
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
