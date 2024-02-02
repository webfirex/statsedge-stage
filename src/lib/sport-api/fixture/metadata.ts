import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";

export class FixtureMetadata {
  public static readonly Route = "FixtureMetadata";
  public static readonly Path = "/v1/fixtures/{id}/metadata/{attribute}";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
      attribute: z.enum(["streamUrl", "hltvMatchUrl"]),
    }),

    Response: z
      .object({
        fixtureId: z.number().int(),
        attribute: z.string(),
        value: z.string(),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    let path = this.Path.replace("{id}", params.id.toString());

    path = path.replace("{attribute}", params.attribute);

    const url = SportApiCore.URL(path);

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

      throw new Error("Error while fetching fixture metadata");
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
