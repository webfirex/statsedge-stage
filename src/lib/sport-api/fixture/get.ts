import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiZod } from "../zod";

export class FixtureGet {
  public static readonly Route = "FixtureGet";
  public static readonly Path = "/v1/fixtures";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number().int(),
        tie: z.boolean().nullable(),
        winnerId: z.number().nullable(),
        scheduledStartTime: SportApiZod.$Time,
        startTime: SportApiZod.$Time.nullable(),
        endTime: SportApiZod.$Time.nullable(),
        status: SportApiZod.$Status,
        format: SportApiZod.Format,
        competition: SportApiZod.Competition,
        sport: SportApiZod.Sport,
        participants: z.array(SportApiZod.Participants),
        links: z.array(SportApiZod.Links),
        maps: z.array(z.unknown()).optional(),
      })
      .nullable()
      .transform((data, ctx) => {
        if (!data) {
          return null;
        }

        if (data.participants.length !== 2) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Expected 2 participants, got ${data.participants.length}`,
            path: ["participants"],
          });
        }

        const NotNullParti = (parti: (typeof data.participants)[0]) => {
          return {
            ...parti,
            id: parti.id ?? 0,
            name: parti.name ?? "",
          };
        };

        return {
          ...data,
          participants: {
            one: data.participants[0]!.id
              ? NotNullParti(data.participants[0]!)
              : null,
            two: data.participants[1]!.id
              ? NotNullParti(data.participants[1]!)
              : null,
          },
        };
      })
      .transform((data, ctx) => {
        if (!data) {
          return null;
        }

        if (data.sport.alias === "cs2" && data.maps) {
          const safeParse = z.array(SportApiZod.Map.CSGO).safeParse(data.maps);

          if (!safeParse.success) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Failed to parse maps for CS:GO`,
              path: ["maps"],
              params: { error: safeParse.error },
            });
          }

          return {
            ...data,
            maps: {
              csgo: safeParse.data,
            },
          };
        }

        if (data.sport.alias === "codmwiii" && data.maps) {
          const safeParse = z.array(SportApiZod.Map.COD).safeParse(data.maps);

          if (!safeParse.success) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Failed to parse maps for Dota 2`,
              path: ["maps"],
              params: { error: safeParse.error },
            });
          }

          return {
            ...data,
            maps: {
              cod: safeParse.data,
            },
          };
        }

        if (data.sport.alias === "lol" && data.maps) {
          const safeParse = z.array(SportApiZod.Map.LOL).safeParse(data.maps);

          if (!safeParse.success) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Failed to parse maps for LoL`,
              path: ["maps"],
              params: { error: safeParse.error },
            });
          }

          return {
            ...data,
            maps: {
              lol: safeParse.data,
            },
          };
        }

        if (data.sport.alias === "dota2" && data.maps) {
          const safeParse = z.array(SportApiZod.Map.DOTA2).safeParse(data.maps);

          if (!safeParse.success) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Failed to parse maps for Dota 2`,
              path: ["maps"],
              params: { error: safeParse.error },
            });
          }

          return {
            ...data,
            maps: {
              dota2: safeParse.data,
            },
          };
        }

        if (data.sport.alias === "valorant" && data.maps) {
          const safeParse = z
            .array(SportApiZod.Map.VALORANT)
            .safeParse(data.maps);

          if (!safeParse.success) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Failed to parse maps for Valorant`,
              path: ["maps"],
              params: { error: safeParse.error },
            });
          }

          return {
            ...data,
            maps: {
              valorant: safeParse.data,
            },
          };
        }

        return {
          ...data,
          maps: undefined,
        };
      }),
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

      throw new Error(
        `${this.Route} failed with status ${rawRes.status} ${rawRes.statusText}`
      );
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

      throw new Error(`${this.Route} failed to validate response`);
    }

    return validatedRes.data;
  };
}
